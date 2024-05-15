import { Router }  from 'express'
import adoptionPointController from '../../controllers/adoption-point.controller.js'

const noAuthAdoptionPointRouter = Router()

noAuthAdoptionPointRouter.get('/adoption-points/', adoptionPointController.get)
noAuthAdoptionPointRouter.get('/adoption-points/:id', adoptionPointController.getById)

export default noAuthAdoptionPointRouter