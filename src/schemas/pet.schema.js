import Joi from 'joi'

const petCreateSchema = Joi.object({
    name: Joi.string().required(),
    adoptionPointId: Joi.number().required(),
    description: Joi.string(),
    age: Joi.string().required(),
    size: Joi.string().required(),
    gender: Joi.string().required(),
    species: Joi.string().required(),
    picture: Joi.string().required(),
    enable: Joi.boolean(),
})

const petUpdateSchema = Joi.object({
    name: Joi.string(),
    adoptionPointId: Joi.number(),
    enable: Joi.boolean(),
    description: Joi.string(),
    age: Joi.string(),
    size: Joi.string(),
    gender: Joi.string(),
    species: Joi.string(),
    picture: Joi.string()
})

const petQueryParamsSchema = Joi.object({
    name: Joi.string(),
    adoptionPointId: Joi.number(),
    enable: Joi.boolean(),
    description: Joi.string(),
    age: Joi.string(),
    size: Joi.string(),
    gender: Joi.string(),
    species: Joi.string(),
    picture: Joi.string(),
    addressCity: Joi.string()

})

export { petCreateSchema, petUpdateSchema, petQueryParamsSchema }