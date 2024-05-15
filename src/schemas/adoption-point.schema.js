import Joi from 'joi'

const adoptionPointCreateSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    postalCode: Joi.string().required(),
    addressState: Joi.string().required(),
    addressCity: Joi.string().required(),
    addressNumber: Joi.number().required(),
    addressCountry: Joi.string().required(),
    observation: Joi.string()
})

const adoptionPointUpdateSchema = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    postalCode: Joi.string(),
    addressState: Joi.string(),
    addressCity: Joi.string(),
    addressNumber: Joi.string(),
    addressCountry: Joi.number(),
    observation: Joi.string()
})

export { adoptionPointCreateSchema, adoptionPointUpdateSchema }