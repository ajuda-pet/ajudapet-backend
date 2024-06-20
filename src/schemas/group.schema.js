import Joi from 'joi'

const groupCreateSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    picture: Joi.string().required(),
    cpfCnpj: Joi.string().required(),
    enable: Joi.boolean(),
    category: Joi.string(),
    instagram: Joi.string().required(),
    phone: Joi.string().required(),
    pixType: Joi.string().required(),
    pixKey: Joi.string().required()
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