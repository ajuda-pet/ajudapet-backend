import { Router } from 'express'
import groupController from '../../controllers/group.controller.js'

const noAuthGroupRouter = Router()

noAuthGroupRouter.get('/groups', groupController.get)
noAuthGroupRouter.get('/groups/:id', groupController.getById)

export default noAuthGroupRouter