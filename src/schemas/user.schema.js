import Joi from 'joi'

const userCreateSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    cpf: Joi.string().required(),
    password: Joi.string().required(),
    phone: Joi.string().required(),
    createdAt: Joi.date().iso().allow(null),
    updatedAt: Joi.date().iso().allow(null).default(null)
})

export { userCreateSchema }