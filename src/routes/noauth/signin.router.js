import { Router } from 'express'
import signinController from '../../controllers/signin.controller.js'

const signinRouter = Router()

signinRouter.post('/signin', signinController.signin)

export default signinRouter