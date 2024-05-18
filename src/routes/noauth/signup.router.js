import { Router } from 'express'
import signupController from '../../controllers/signup.controller.js'
import inviteMiddleware from '../auth/middlewares/invite.middleware.js'

const signupRouter = Router()

signupRouter.post('/signup', signupController.create)
signupRouter.post('/signup/invite', inviteMiddleware, signupController.createByInvite)



export default signupRouter