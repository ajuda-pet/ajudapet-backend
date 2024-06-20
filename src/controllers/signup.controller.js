import jwt from 'jsonwebtoken'
import { encryptPassword } from '../libraries/password-crypto.js'
import { groupCreateSchema } from '../schemas/group.schema.js'
import groupService from '../services/group.service.js'
import responseEmoji from '../libraries/response-emoji.js'
import inviteService from '../services/invite.service.js'
import socialMediaService from '../services/social-media.service.js'
import { groupCategoryEnum } from '@prisma/client'
import pixService from '../services/pix.service.js'
const signupController = {
    create: async (request, response) =>  {
        try {
            const { error, value: payload } = groupCreateSchema.validate(request.body)

            if (error) {
                return response.status(400).send({ success: false, message: error.details })
            }

            const [groupByEmail, groupByCpfCnpj, groupByName] = await Promise.all([
                groupService.getByEmail(payload.email),
                groupService.getByCpfCnpj(payload.cpfCnpj),
                groupService.getByName(payload.name)
            ])

            if (!groupCategoryEnum[payload.category]) {
                return response.status(400).send({ success: false, message: `${responseEmoji.fail} Categoria do Grupo está incorreta!`})
            }

            if (groupByEmail) {
                return response.status(409).send({ success: false, message: 'Email já cadastrado. 😿'})
            }

            if (groupByCpfCnpj) {
                return response.status(409).send({ success: false, message: 'CPF já cadastrado. 😿'})
            }

            if (groupByName) {
                return response.status(409).send({ success: false, message: 'Nome de grupo já cadastrado. 😿'})
            }

            const passwordHashed = await encryptPassword(payload.password)
            const newGroup = await groupService.create({
                name: payload.name,
                email: payload.email,
                cpfCnpj: payload.cpfCnpj,
                picture: payload.picture,
                category: payload.category,
                description: payload.description,
                password: passwordHashed })

            await socialMediaService.create({
                groupId: newGroup.id,
                plataform: 'WHATSAPP',
                account: payload.phone,
            })

            await socialMediaService.create({
                groupId: newGroup.id,
                plataform: 'INSTAGRAM',
                account: payload.instagram,
            })

            await pixService.create({
                groupId: newGroup.id,
                type: payload.pixType,
                key: payload.pixKey
            })

            
            const secretKey = process.env.JWT_SECRET_KEY
            const token = jwt.sign({ groupId: newGroup.id }, secretKey, { expiresIn: '72h' })

            return response.status(201).send({ success: true, info: { groupId: newGroup.id, token }, message: 'Grupo criado com sucesso. 😸'})
        }

        catch (error) {
            console.error(error)
            return response.status(500).send({ success: false, message: 'Erro interno no servidor. 😿'})
        }
    },

    createByInvite: async (request, response) => {
        try {
            const { hostId } = request
            const { error, value: payload } = groupCreateSchema.validate(request.body)
            
            if (error) {
                return response.status(400).send({ success: false, message: error.details })
            }

            const [groupByEmail, groupByCpf, groupByName] = await Promise.all([
                groupService.getByEmail(payload.email),
                groupService.getByCpf(payload.cpf),
                groupService.getByName(payload.name)
            ])

            if (groupByEmail) {
                return response.status(409).send({ success: false, message: `Email já cadastrado. ${responseEmoji.fail}` })
            }

            if (groupByCpf) {
                return response.status(409).send({ success: false, message: `CPF já cadastrado. ${responseEmoji.fail}` })
            }

            if (groupByName) {
                return response.status(409).send({ success: false, message: `Nome de grupo já cadastrado. ${responseEmoji.fail}` })
            }

            const passwordHashed = await encryptPassword(payload.password)
            const {id: guestId } = await groupService.create({ ...payload, password: passwordHashed, enable: true })

            await inviteService.create({ hostId, guestId: guestId })

            return response.status(201).send({ success: true, message: `Grupo criado com sucesso. ${responseEmoji.success}` })
        }

        catch (error) {
            console.error(error)
            return response.status(500).send({ success: false, message: `Erro interno no servidor. ${responseEmoji.fail}`})
        }
    }
}

export default signupController