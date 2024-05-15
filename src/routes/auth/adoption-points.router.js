import { Router } from 'express'
import adoptionPointController from '../../controllers/adoption-point.controller.js'

const authAdoptionPointRouter = Router()

authAdoptionPointRouter.post('/adoption-points', adoptionPointController.create)
authAdoptionPointRouter.put('/adoption-points/:id', adoptionPointController.update)
authAdoptionPointRouter.delete('/adoption-points/:id', adoptionPointController.delete)

export default authAdoptionPointRouter