import Joi from 'joi'

const ongCreateSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    createdAt: Joi.date().iso().allow(null),
    updatedAt: Joi.date().iso().allow(null)
})

export default ongCreateSchema