import { Router } from 'express'
import petController from '../../controllers/pet.controller.js'

const noAuthPetRouter = Router()

noAuthPetRouter.get('/pets', petController.getAll)
noAuthPetRouter.get('/pets/:petId', petController.getById)
noAuthPetRouter.get('/pets/adoption-points/:adoptionPointId', petController.getPetsByAdoptionId)
noAuthPetRouter.get('/pets/groups/:groupId', petController.getPetsByGroup)


export default noAuthPetRouter