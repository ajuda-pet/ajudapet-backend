import Joi from 'joi'

const petCreateSchema = Joi.object({
    name: Joi.string().required(),
    adoptionPointId: Joi.number().required(),
    description: Joi.string(),
    age: Joi.string().required(),
    size: Joi.string().required(),
    gender: Joi.string().required(),
    species: Joi.string().required(),
    picture: Joi.string().required()
})

const petUpdateSchema = Joi.object({
    name: Joi.string(),
    adoptionPointId: Joi.number(),
    availibilityAdoptionId: Joi.number(),
    description: Joi.string(),
    age: Joi.string(),
    size: Joi.string(),
    gender: Joi.string(),
    species: Joi.string(),
    picture: Joi.string()
})

export { petCreateSchema, petUpdateSchema }