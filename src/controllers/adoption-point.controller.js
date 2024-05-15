import responseEmoji from '../libraries/response-emoji.js'
import { adoptionPointCreateSchema, adoptionPointUpdateSchema } from '../schemas/adoption-point.schema.js'
import adoptionPointService from '../services/adoption-point.service.js'
import { addressStateEnum } from '@prisma/client'

const adoptionPointController = {
    get: async (request, response) => {
        try {
            const adoptionPoints = await adoptionPointService.get()
            return response.status(200).send({ success: true, info: { adoptionPoints }, message: `Query executada com sucesso ${responseEmoji.success}` })
        }

        catch (error) {
            console.error(error)
            return response.status(500).send({ success: false, message: `Erro interno no serviddor. ${responseEmoji.fail}`})
        }
    },

    getById: async (request, response) => {
        try {
            const { id } = request.params

            const adoptionPoint = await adoptionPointService.getById(id)

            if (!adoptionPoint) {
                return response.status(404).send({ success: false, message: `Ponto de adoção não encontrado. ${responseEmoji.fail}`})
            }

            return response.status(200).send({ success: true, info: { adoptionPoint }, message: 'Ponto de adoção encontrado'})
        }

        catch (error) {
            console.error(error)
            return response.status(500).send({ success: false, message: `Erro interno no serviddor. ${responseEmoji.fail}` })
        }
    },

    create: async (request, response) => {
        try {
            const { error, value: payload } = adoptionPointCreateSchema.validate(request.body) 
            const { id: groupId } = request.group

            if (error) {
                return response.status(400).send({ success: false, message: error.details })
            }

            if (!addressStateEnum[payload.addressState]) {
                return response.status(400).send({ success: false, message: `Sigla da UF incorreta. ${responseEmoji.fail }`})
            }

            const adoptionPoint = await adoptionPointService.getByName(payload.name)

            if (adoptionPoint) {
                return response.status(409).send({ success: false, message: `Nome de ponto de doação já existente. ${responseEmoji.fail}`})
            }

            const newAdoptionPoint = await adoptionPointService.create({ ...payload, groupId })
            
            return response.status(201).send({ success: true, info: { adoptionPoint: newAdoptionPoint }, message: `Ponto de adoção criado. ${responseEmoji.success}`})
        }

        catch (error) {
            console.error(error)
            return response.status(500).send({ success: false, message: `Erro interno no servidor. ${responseEmoji.fail}`})
        }
    },

    update: async (request, response) => {
        try {
            const { id: groupId } = request.group
            const { id: adoptionId } = request.params
            const  { error, value: payload } = adoptionPointUpdateSchema.validate(request.body)

            if (error) {
                return response.status(400).send({ success: false, message: error.details })
            }

            const [adoptionPointByGroupId, adoptionPointByName] = await Promise.all([
                await adoptionPointService.getByAdoptionPointIdAndGroupId(adoptionId, groupId), 
                await adoptionPointService.getByName(payload.name)
            ])
            
            if (!adoptionPointByGroupId) {
                return response.status(404).send({ success: false, message: `Ponto de adoção não encontrado. ${responseEmoji.fail}` })
            }

            if (adoptionPointByName) {
                return response.status(409).send({ success: false, message: `Nome de ponto de doação já existente. ${responseEmoji.fail}` })
            }

            if (payload.addressState && !addressStateEnum[payload.addressState]) {
                return response.status(400).send({ success: false, message: `Sigla do Estado está incorreta. ${responseEmoji.fail}`})
            }

            const updates = adoptionPointService.updateById(adoptionId, payload)
            const newAdoptionPoint = { ...adoptionPoint, ...updates }

            return response.status(200).send({ success: true, info: { adoptionPoint: newAdoptionPoint }, message: `Ponto de adoção atualizado. ${responseEmoji.success}`})
        }

        catch (error) {
            console.error(error)
            response.status(500).send({ success: false, message: `Erro interno no servidor. ${responseEmoji.fail}`})
        }
    },

    delete: async (request, response) => {
        try {
            const { id: adoptionPointId} = request.params
            const { id: groupId } = request.group

            const adoptionPoint = await adoptionPointService.getByAdoptionPointIdAndGroupId(adoptionPointId, groupId)

            if (!adoptionPoint) {
                return response.status(404).send({ success: false, message: `Ponto de adoção não encontrado. ${responseEmoji.fail}`})
            }
            
            await adoptionPointService.delete(adoptionPointId)
            return response.status(204).send({ success: true, message: `Ponto de adoção deletado. ${responseEmoji.success}`})
        }

        catch (error) {
            console.error(error)
            return response.status(500).send({ success: false, message: `Erro interno no servidor. ${responseEmoji.fail}`})
        }
    }
}

export default adoptionPointController