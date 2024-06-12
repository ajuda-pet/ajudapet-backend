import { socialMediaCreateSchema, socialMediaUpdateSchema } from '../schemas/social-media.schema.js'
import { socialMediaEnum } from '@prisma/client'
import socialMediaService from '../services/social-media.service.js'

const socialMediaController = {
    update: async(request, response) => {
        try {
            const { error, value: payload } = socialMediaUpdateSchema.validate(request.body)
            const { plataform } = request.params
            const { group } = request

            if (error) {
                console.error(error)
                return response.status(400).send({ success: false, message: error.details })
            }

            const socialMedia = await socialMediaService.getByGroupIdAndPlataform(group.id, plataform.toUpperCase())

            if (!socialMedia) {
                return response.status(404).send({ success: false, message: 'Rede social não encontrada. 😿'})
            }

            if (!socialMediaEnum[plataform.toUpperCase()]) {
                return response.status(400).json({ success: false, message: 'Plataforma inválida. 😿' });
            }

            const updates = await socialMediaService.updateByIdAndPlataform(socialMedia.id, plataform.toUpperCase(), payload)
            const socialMediaUpdated = { ...payload, ...updates }

            return response.status(200).send({ success: true, info: { socialMedia: socialMediaUpdated }, message: 'Query com sucesso. 😸'})

        }

        catch (error) {
            console.error(error)
            return response.status(500).send({ success: false, message: 'Erro no servidor. 😿'})
        }
    },

    create: async (request, response) => {
        try {
            const { error, value: payload } = socialMediaCreateSchema.validate(request.body)
            const { group } = request 

            
            if (error) {
                console.error(error)
                return response.status(400).send({ success: false, message: error.details })
            }
            
            if (!socialMediaEnum[payload.plataform]) {
                return response.status(400).json({ success: false, message: 'Plataforma inválida. 😿' });
            }

            const socialMedia = await socialMediaService.getByGroupIdAndPlataform(group.id, payload.plataform)

            if (socialMedia) {
                return response.status(409).send({ success: false, message: 'Essa rede social já está cadastrada. 😿'})
            }

            const newSocialMedia = await socialMediaService.create({
                ...payload,
                groupId: group.id,
            })

            return response.status(200).send({ success: true, info: { newSocialMedia }, message: 'Rede social cadastrada com sucesso. 😸'})
        }

        catch (error) {
            console.error(error)
            return response.status(500).send({ success: false, message: 'Erro no servidor. 😿' })
        }
    },

    delete: async (request, response) => {
        const { plataform } = request.params
        const { id: groupId } = request.group

        if (!socialMediaEnum[plataform.toUpperCase()]) {
            return response.status(400).send({ success: false, message: 'Rede social inválida. 😿'})
        }

        const socialMedia = await socialMediaService.getByGroupIdAndPlataform(groupId, plataform.toUpperCase())

        if (!socialMedia) {
            return response.status(404).send({ success: false, message: 'Plataforma não cadastrada. 😿'})
        }

        await socialMediaService.delete(socialMedia.id)
        return response.status(204).send({ success: true, messaege: 'Social media deleted. 😸'})

    }
}

export default socialMediaController