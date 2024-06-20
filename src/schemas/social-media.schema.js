import Joi from 'joi'

const socialMediaCreateSchema = Joi.object({
    plataform: Joi.string().required(),
    account: Joi.string().required(), 
})

const socialMediaUpdateSchema = Joi.object({
    account: Joi.string(),
})

export { socialMediaCreateSchema, socialMediaUpdateSchema }