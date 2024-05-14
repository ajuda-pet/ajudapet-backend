import { Router } from 'express'
import groupController from '../../controllers/group.controller.js'
import socialMediaController from '../../controllers/social-media.controller.js'

const authGroupRouter = Router()

authGroupRouter.put('/groups', groupController.update)
authGroupRouter.post('/groups/social-media', socialMediaController.create)
authGroupRouter.put('/groups/social-media/:plataform', socialMediaController.update)
authGroupRouter.delete('/groups/social-media/:plataform', socialMediaController.delete)

export default authGroupRouter
