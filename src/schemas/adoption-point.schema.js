import Joi from 'joi'

const adoptionPointCreateSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    lat: Joi.number().required(),
    lon: Joi.number().required(),
    postalCode: Joi.string().required(),
    addressState: Joi.string().required(),
    addressNeighborhood: Joi.string().required(),
    addressCity: Joi.string().required(),
    addressStreet: Joi.string().required(),
    addressNumber: Joi.number().required(),
    addressCountry: Joi.string().required(),
    enable: Joi.boolean(),
    observation: Joi.string()
})

const adoptionPointUpdateSchema = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    lat: Joi.number().required(),
    lon: Joi.number().required(),
    enable: Joi.boolean(),
    postalCode: Joi.string(),
    addressState: Joi.string(),
    addressNeighborhood: Joi.string(),
    addressCity: Joi.string(),
    addressStreet: Joi.string(),
    addressNumber: Joi.string(),
    addressCountry: Joi.number(),
    observation: Joi.string()
})

export { adoptionPointCreateSchema, adoptionPointUpdateSchema }