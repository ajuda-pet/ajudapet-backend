import Joi from 'joi'

const socialMediaCreateSchema = Joi.object({
    plataform: Joi.string().required(),
    username: Joi.string().required(), 
    url: Joi.string().required()
})

const socialMediaUpdateSchema = Joi.object({
    username: Joi.string(),
    url: Joi.string()
})

export { socialMediaCreateSchema, socialMediaUpdateSchema }


