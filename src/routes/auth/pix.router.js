import { Router } from 'express';
import pixController from '../../controllers/pix.controller.js';

const authPixRouter = Router();

authPixRouter.get('/groups/:groupId/pix', pixController.get);
authPixRouter.post('/groups/:groupId/pix', pixController.create);
authPixRouter.put('/groups/:groupId/pix', pixController.update);
authPixRouter.delete('/groups/:groupId/pix', pixController.delete);

export default authPixRouter;
