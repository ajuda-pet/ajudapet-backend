import Joi from 'joi'

const groupCreateSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    password: Joi.string().required(),
    cpf: Joi.string().required(),
    enable: Joi.boolean(),
    picture: Joi.string(),
})


const groupUpdateSchema = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    picture: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
    enable: Joi.boolean(),
    cpf: Joi.string()
})

export { groupCreateSchema, groupUpdateSchema }