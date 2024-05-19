import responseEmoji from '../libraries/response-emoji.js';
import { pixCreateSchema, pixUpdateSchema } from '../schemas/pix.schema.js';
import pixService from '../services/pix.service.js';

const pixController = {
    get: async (request, response) => {
        try {
            const { group_id } = request.params;
            const pixRecords = await pixService.getByGroupId(group_id);
            return response.status(200).send({ success: true, info: { pixRecords }, message: `Query executada com sucesso. ${responseEmoji.success}` });
        } catch (error) {
            console.error(error);
            return response.status(500).send({ success: false, message: `Erro interno no servidor. ${responseEmoji.fail}` });
        }
    },

    getById: async (request, response) => {
        try {
            const { id, group_id } = request.params;
            const pixRecord = await pixService.getByIdAndGroupId(id, group_id);

            if (!pixRecord) {
                return response.status(404).send({ success: false, message: `Registro PIX não encontrado. ${responseEmoji.fail}` });
            }

            return response.status(200).send({ success: true, info: { pixRecord }, message: 'Registro PIX encontrado.' });
        } catch (error) {
            console.error(error);
            return response.status(500).send({ success: false, message: `Erro interno no servidor. ${responseEmoji.fail}` });
        }
    },

    create: async (request, response) => {
        try {
            const { error, value: payload } = pixCreateSchema.validate(request.body);
            const { group_id } = request.params;

            if (error) {
                return response.status(400).send({ success: false, message: error.details });
            }

            const existingPix = await pixService.getByKeyAndGroupId(payload.key, group_id);

            if (existingPix) {
                return response.status(409).send({ success: false, message: `Chave PIX já existente para este grupo. ${responseEmoji.fail}` });
            }

            const newPix = await pixService.create({ ...payload, group_id: parseInt(group_id) });
            return response.status(201).send({ success: true, info: { pix: newPix }, message: `Registro PIX criado. ${responseEmoji.success}` });
        } catch (error) {
            console.error(error);
            return response.status(500).send({ success: false, message: `Erro interno no servidor. ${responseEmoji.fail}` });
        }
    },

    update: async (request, response) => {
        try {
            const { id, group_id } = request.params;
            const { error, value: payload } = pixUpdateSchema.validate(request.body);

            if (error) {
                return response.status(400).send({ success: false, message: error.details });
            }

            const existingPix = await pixService.getByIdAndGroupId(id, group_id);

            if (!existingPix) {
                return response.status(404).send({ success: false, message: `Registro PIX não encontrado. ${responseEmoji.fail}` });
            }

            const updatedPix = await pixService.updateByIdAndGroupId(id, group_id, payload);
            return response.status(200).send({ success: true, info: { pix: updatedPix }, message: `Registro PIX atualizado. ${responseEmoji.success}` });
        } catch (error) {
            console.error(error);
            return response.status(500).send({ success: false, message: `Erro interno no servidor. ${responseEmoji.fail}` });
        }
    },

    delete: async (request, response) => {
        try {
            const { id, group_id } = request.params;
            const existingPix = await pixService.getByIdAndGroupId(id, group_id);

            if (!existingPix) {
                return response.status(404).send({ success: false, message: `Registro PIX não encontrado. ${responseEmoji.fail}` });
            }

            await pixService.deleteByIdAndGroupId(id, group_id);
            return response.status(204).send({ success: true, message: `Registro PIX deletado. ${responseEmoji.success}` });
        } catch (error) {
            console.error(error);
            return response.status(500).send({ success: false, message: `Erro interno no servidor. ${responseEmoji.fail}` });
        }
    }
};

export default pixController;