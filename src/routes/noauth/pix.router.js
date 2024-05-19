import { Router } from 'express';
import pixController from '../../controllers/pix.controller.js';

const noAuthPixRouter = Router();


noAuthPixRouter.post('/pix', pixController.create)

//noAuthPixRouter.get('/pix/:group_id', pixController.get);
noAuthPixRouter.get('/pix/:group_id/:id', pixController.getById);
noAuthPixRouter.post('/pix/:group_id', pixController.create);
noAuthPixRouter.put('/pix/:group_id/:id', pixController.update);
noAuthPixRouter.delete('/pix/:group_id/:id', pixController.delete);

export default noAuthPixRouter;
