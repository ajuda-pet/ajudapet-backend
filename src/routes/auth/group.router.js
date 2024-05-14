import { Router } from 'express'
import groupController from '../../controllers/group.controller.js'

const authGroupRouter = Router()

authGroupRouter.put('/groups', groupController.update)

export default authGroupRouter
