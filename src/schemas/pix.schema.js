import Joi from 'joi';

const pixCreateSchema = Joi.object({
    key: Joi.string().required(),
    type: Joi.string().required(),
    qrcode: Joi.string().required(),
})

const pixUpdateSchema = Joi.object({
    key: Joi.string(),
    type: Joi.string(),
    qrcode: Joi.string(),
})

export { pixCreateSchema, pixUpdateSchema };
