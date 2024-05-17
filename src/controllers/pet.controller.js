import responseEmoji from '../libraries/response-emoji.js'
import { petCreateSchema, petUpdateSchema } from '../schemas/pet.schema.js'
import adoptionPointService from '../services/adoption-point.service.js'
import groupService from '../services/group.service.js'
import petService from '../services/pet.service.js'
import { sizePetEnum, agePetEnum, speciesPetEnum , genderPetEnum } from '@prisma/client'

const petController = {
    getAll: async (request, response) => {
        try {
            const pets = await petService.get()
            return response.status(200).send({ success: true, info: { pets }, message: `Query executada. ${responseEmoji.success}`})
        }

        catch (error) {
            console.error(error)
            return response.status(500).send({ success: false, message: `Erro interno no servidor. ${responseEmoji.fail}`})
        }
    },

    getById: async (request, response) => {
        try {
            const { petId } = request.params
            const pet = await petService.getById(petId)

            if (!pet) {
                return response.status(404).send({ success: false, message: `Pet não ncontrado. ${responseEmoji.fail}`})
            }

            return response.status(200).send({ success: true, info: { pet }, message: `Query executada. ${responseEmoji.success}`})
        }


        catch(error) {
            console.error(error)
            return response.status(500).send({ success: false, message: `Erro interno no servidor. ${responseEmoji.fail}`})
        }
    },

    getPetsByAdoptionId: async(request, response) => {
        try {
            const { adoptionPointId } = request.params
            const adoptionPoint = await adoptionPointService.getById(adoptionPointId)

            if (!adoptionPoint) {
                return response.status(404).send({success: false, message: `Ponto de adoção não encontrado. ${responseEmoji.fail}`})
            }
            
            const pets = await petService.getByAdoptionPointId(adoptionPointId)
            return response.status(200).send({ success: true, info: { pets }, message: `Query executada. ${responseEmoji.success}` })
        }

        catch (error) {
            console.error(error)
            return response.status(500).send({ success: false, message: `Erro interno no servidor ${responseEmoji.fail}` })
        }
    },

    getPetsByGroup: async (request, response) => {
        try {
            const { groupId } = request.params
            const group = await groupService.getById(groupId)

            if (!group) {
                return response.status(404).send({ success: false, message: `Grupo não encontrado ${responseEmoji.fail}`})
            }

            const pets = await petService.getByGroupId(groupId)
            return response.status(200).send({ success: true, info: { pets }, message: `Query executada. ${responseEmoji.success}`})
        }

        catch (error) {
            console.error(error)
            return response.status(500).send({ success: false, message: `Erro interno no servidor ${responseEmoji.fail}`})
        }
    },

    create: async (request, response) => {
        try {
            const { id: groupId } = request.group
            const { error, value: payload } = petCreateSchema.validate(request.body)

            if (error) {
                return response.status(400).send({ success: false, message: error.details })
            }

            const adoptionPoint = await adoptionPointService.getById(payload.adoptionPointId)

            if (!adoptionPoint || adoptionPoint.groupId != groupId) {
                return response.status(404).send({ success: false, message: `Ponto de adoção inválido para esse grupo. ${responseEmoji.fail}`})
            }

            const { size, gender, age, species } = payload
            if (!sizePetEnum[size]) return response.status(400).send({ success: false, message: `Tamanho inválido. ${responseEmoji.fail}` })
            if (!genderPetEnum[gender]) return response.status(400).send({ success: false, message: `Genero inválido. ${responseEmoji.fail}` })
            if (!agePetEnum[age]) return response.status(400).send({ success: false, message: `Faixa de idade inválida. ${responseEmoji.fail}` })
            if (!speciesPetEnum[species]) return response.status(400).send({ success: false, message: `Espécie inválida. ${responseEmoji.fail}` })

            const { id: adoptionPointId } = adoptionPoint
            const pet = await petService.create({ ...payload, adoptionPointId })

            return response.status(201).send({ success: true, info: { pet }, messasge: `Pet created. ${responseEmoji.success}`})
        }

        catch (error) {
            console.error(error)
            return response.status(500).send({ success: false, message: `Error interno no servidor. ${responseEmoji.fail}`})
        }
    },

    update: async (request, response) => {
        try {
            const { id: groupId } = request.group
            const { petId } = request.params
            const { error, value: payload } = petUpdateSchema.validate(request.body)

            if (error) {
                console.error(error)
                return response.status(400).send({ success: false, message: error.details})
            }

            const pet = await petService.getByGroupIdAndPetId(groupId, petId)
            console.log(pet)

            if (!pet) {
                return response.status(404).send({ success: false, message: `Pet não encontrado. ${responseEmoji.fail}`})
            }

            const { size, gender, age, species } = payload 
            if (size && !sizePetEnum[size]) return response.status(400).send({ success: false, message: `Tamanho inválido. ${responseEmoji.fail}`})
            if (gender && !genderPetEnum[gender]) return response.status(400).send({ success: false, message: `Genero inválido. ${responseEmoji.fail}`})
            if (age && !agePetEnum[age]) return response.status(400).send({ success: false, message: `Faixa de idade inválida. ${responseEmoji.fail}`})
            if (species && !speciesPetEnum[species]) return response.status(400).send({ success: false, message: `Espécie inválida. ${responseEmoji.fail}`})

            const updates = await petService.updateById(petId, payload)
            const newPet = { ...pet, ...updates }

            return response.status(200).send({ success: true, info: { pet: newPet }, message: `Pet atualizado`})
        }

        catch (error) {
            console.error(error)
            return response.status(500).send({ success: false, message: `Erro interno no servidor ${responseEmoji.fail}`})
        }
    },

    delete: async (request, response) => {
        try {
            const { id: groupId } = request.group
            const { petId } = request.params

            const pet = await petService.getByGroupIdAndPetId(groupId, petId)

            if (!pet) {
                return response.status(404).send({ success: false, message: `Pet não encontrado. ${responseEmoji.fail}`})
            }

            await petService.delete(petId)
            return response.status(204).send({ success: true, message: `Pet removido. ${responseEmoji.success}`})
        }

        catch (error) {
            console.error(error)
            return response.status(500).send({ success: false, message: `Erro interno no servidor ${responseEmoji.fail}`})
        }
    }
}

export default petController