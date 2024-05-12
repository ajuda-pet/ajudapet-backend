import { Router } from 'express'
import ongController from '../../controllers/ong.controller.js'

const authOngRouter = Router()
const noauthOngRouter = Router()

authOngRouter.post('/ong', ongController.create)

noauthOngRouter.get('/ong', ongController.get)
noauthOngRouter.get('/ong/:id', ongController.getById)

export { authOngRouter, noauthOngRouter }