import { Router } from 'express'
import groupController from '../../controllers/group.controller.js'
import socialMediaController from '../../controllers/social-media.controller.js'
import inviteController from '../../controllers/invite.controller.js'

const authGroupRouter = Router()

authGroupRouter.put('/groups', groupController.update)
authGroupRouter.delete('/groups', groupController.delete)
authGroupRouter.post('/groups/social-media', socialMediaController.create)
authGroupRouter.put('/groups/social-media/:plataform', socialMediaController.update)
authGroupRouter.delete('/groups/social-media/:plataform', socialMediaController.delete)

authGroupRouter.get('/groups/invite', inviteController.get)

export default authGroupRouter
