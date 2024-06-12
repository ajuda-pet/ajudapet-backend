import { Router } from 'express'
import pixController from '../../controllers/pix.controller.js'

const noAuthPixRouter = Router()

noAuthPixRouter.get('/pix', pixController.get)
noAuthPixRouter.get('/pix/:pixId', pixController.getById)


export default noAuthPixRouter