import { encryptPassword } from '../libraries/password-crypto.js'
import groupService from '../services/group.service.js'
import groupCreateSchema from '../schemas/group.schema.js'

const signupController = {
    create: async (request, response) =>  {
        try {
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
                return response.status(409).send({ success: false, message: 'Email já cadastrado. 😿'})
            }

            if (groupByCpf) {
                return response.status(409).send({ success: false, message: 'CPF já cadastrado. 😿'})
            }

            if (groupByName) {
                return response.status(409).send({ success: false, message: 'Nome de grupo já cadastrado. 😿'})
            }

            const passwordHashed = await encryptPassword(payload.password)
            await groupService.create({...payload, password: passwordHashed, isActive: false})

            return response.status(201).send({ success: true, message: 'Grupo criado com sucesso. 😸'})
        }

        catch (error) {
            console.error(error)
            return response.status(500).send({ success: false, message: 'Erro interno no servidor. 😿'})
        }
    }
}

export default signupController