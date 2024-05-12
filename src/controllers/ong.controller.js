import ongCreateSchema from '../schemas/ong.schema.js'
import ongService from '../services/ong.service.js'
import userOngService from '../services/user-ong.service.js'
import { Role } from '@prisma/client'

const ongController = {
    get: async (request, response) => {
        try {
            const ong = await ongService.get()
            return response.status(200).send({ success: true, info: { ong }, message: 'Query realizada com sucesso'})
        }

        catch (error) {
            console.error(error)
            return response.status(500).send({ success: false, message: 'Internal server error'})
        }
    },

    getById: async (request, response) => {
        try {
            const { id } = request.params
            const ong = await ongService.getById(id)

            if (!ong) {
                return response.status(404).send({ sucess: false, message: 'ONG não encontrada'})
            }

            return response.status(200).send({ success: true, info: { ong }, message: 'ONG encontrada!'})
        }

        catch (error) {
            console.error(error)
            return response.status(500).send({ success: false, message: 'Internal server erro'})
        }
    },

    create: async (request, response) => {
        try {
            const {error, value: payload } = ongCreateSchema.validate(request.body)
            const { user } = request 

            if (error) {
                return response.status(400).send({ success: false, message: error.details })
            }

            const ongByName = await ongService.getByName(payload.name)
            const ongByEmail = await ongService.getByEmail(user.email)

            if (ongByName) {
                return response.status(409).send({ success: false, message: 'Ops! Já existe um ONG com esse nome' })
            }

            if (ongByEmail) {
                return response.status(409).send({ success: false, message: 'Ops! Já existe uma ONG com esse email' })
            }

            const newOng = await ongService.create({ 
                ...payload,
                isActive: false,
                phone: user.phone
            })

            await userOngService.create({
                userId: user.id,
                ongId: newOng.id,
                role: Role.OWNER
            })

            return response.status(200).send({ success: true, message: 'ONG criada!'})
        }

        catch (error) {
            console.error(error)
            return response.status(500).send({ success: false, message: 'Internal server error'})
        }
    }
}

export default ongController