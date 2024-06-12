import { Router } from 'express'
import authenticationController from '../../../controllers/authentication.controller.js'

const authAuthenticationRouter = Router()

authAuthenticationRouter.get('/authenticate', authenticationController.isAuthenticate)

export default authAuthenticationRouter