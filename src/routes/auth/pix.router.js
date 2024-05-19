import { Router } from 'express';
import pixController from '../../controllers/pix.controller.js';

const authPixRouter = Router();

authPixRouter.get('/groups/:group_id/pix', pixController.get);
authPixRouter.get('/groups/:group_id/pix/:id', pixController.getById);
authPixRouter.post('/groups/:group_id/pix', pixController.create);
authPixRouter.put('/groups/:group_id/pix/:id', pixController.update);
authPixRouter.delete('/groups/:group_id/pix/:id', pixController.delete);

export default authPixRouter;
