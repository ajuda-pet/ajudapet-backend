import responseEmoji from '../libraries/response-emoji.js';
import { pixCreateSchema, pixUpdateSchema } from '../schemas/pix.schema.js';
import pixService from '../services/pix.service.js';
import { pixTypeEnum } from '@prisma/client'

const pixController = {
    get: async (request, response) => {
        try {
            const pixes = await pixService.get()
            return response.status(200).send({ success: true, info: { pixes }, message: `Query executada com sucesso. ${responseEmoji.success}` })
        }

        catch (error) {
            console.error(error);
            return response.status(500).send({ success: false, message: `Erro interno no servidor. ${responseEmoji.fail}` });
        }
    },

    getById: async (request, response) => {
        try {
            const { pixId } = request.params
            const pix = await pixService.getById(pixId);

            if (!pix) {
                return response.status(404).send({ success: false, message: `Registro PIX não encontrado. ${responseEmoji.fail}` });
            }

            return response.status(200).send({ success: true, info: { pix }, message: 'Registro PIX encontrado.' });
        }

        catch (error) {
            console.error(error);
            return response.status(500).send({ success: false, message: `Erro interno no servidor. ${responseEmoji.fail}` });
        }
    },

    create: async (request, response) => {
        try {
            const { id: groupId } = request.group;
            const { error, value: payload } = pixCreateSchema.validate(request.body);

            if (error) {
                return response.status(400).send({ success: false, message: error.details })
            }

            const existingPix = await pixService.getByKeyAndGroupId(payload.key, groupId)

            if (existingPix) {
                return response.status(409).send({ success: false, message: `Chave PIX já existente para este grupo. ${responseEmoji.fail}` });
            }

            if (!pixTypeEnum[payload.type.toUpperCase()]) {
                return response.status(400).send({ success: false, message: `Type está incorreto ${responseEmoji.fail}` })
            }

            const newPix = await pixService.create({ ...payload, type: payload.type.toUpperCase(), groupId });
            return response.status(201).send({ success: true, info: { pix: newPix }, message: `Registro PIX criado. ${responseEmoji.success}` });
        }

        catch (error) {
            console.error(error);
            return response.status(500).send({ success: false, message: `Erro interno no servidor. ${responseEmoji.fail}` });
        }
    },

    update: async (request, response) => {
        try {

            const { id: groupId } = request.group;
            const { error, value: payload } = pixUpdateSchema.validate(request.body)

            if (error) {
                return response.status(400).send({ success: false, message: error.details })
            }

            const existingPix = await pixService.getByIdAndGroupId(groupId, groupId)

            if (!existingPix) {
                return response.status(404).send({ success: false, message: `Registro PIX não encontrado. ${responseEmoji.fail}` })
            }

            const updatedPix = await pixService.updateByIdAndGroupId(groupId, groupId, payload)

            return response.status(200).send({ success: true, info: { pix: updatedPix }, message: `Registro PIX atualizado. ${responseEmoji.success}` })
        }

        catch (error) {
            console.error(error);
            return response.status(500).send({ success: false, message: `Erro interno no servidor. ${responseEmoji.fail}` });
        }
    },

    delete: async (request, response) => {
        try {
            const { id: groupId } = request.group

            const existingPix = await pixService.getByGroupId(groupId)

            if (!existingPix) {
                return response.status(404).send({ success: false, message: `Registro PIX não encontrado. ${responseEmoji.fail}` })
            }

            await pixService.deleteById(existingPix.id)
            return response.status(204).send({ success: true, message: `Registro PIX deletado. ${responseEmoji.success}` })
        }

        catch (error) {
            console.error(error)
            return response.status(500).send({ success: false, message: `Erro interno no servidor. ${responseEmoji.fail}` })
        }
    }
}

export default pixController;
