import Joi from 'joi'

const socialMediaCreateSchema = Joi.object({
    plataform: Joi.string().required(),
    account: Joi.string().required(), 
    url: Joi.string()
})

const socialMediaUpdateSchema = Joi.object({
    account: Joi.string(),
    url: Joi.string()
})

export { socialMediaCreateSchema, socialMediaUpdateSchema }