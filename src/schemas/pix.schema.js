import Joi from 'joi';

const pixCreateSchema = Joi.object({
    id: Joi.number().integer().required(),
    key: Joi.string().required(),
    type: Joi.string().required(),
    group_id: Joi.number().integer().required(),
    qrcode: Joi.string().required(),
});

const pixUpdateSchema = Joi.object({
    key: Joi.string(),
    type: Joi.string(),
    group_id: Joi.number().integer(),
    qrcode: Joi.string(),
});

export { pixCreateSchema, pixUpdateSchema };
