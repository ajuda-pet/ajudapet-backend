import { Router } from 'express'
import petController from '../../controllers/pet.controller.js'

const authPetRouter = Router()

authPetRouter.post('/pets', petController.create)
authPetRouter.put('/pets/:petId', petController.update)
authPetRouter.delete('/pets/:petId', petController.delete)
authPetRouter.get('/pets/adoption-points/:adoptionPointId', petController.getPetsByAdoptionId)

export default authPetRouter