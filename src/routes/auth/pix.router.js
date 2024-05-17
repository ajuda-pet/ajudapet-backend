import { Router } from 'express';
import groupController from '../../controllers/group.controller.js';
import pixController from '../../controllers/pix.controller.js';

const authGroupRouter = Router();

authGroupRouter.get('/groups/:group_id/pix', pixController.get);
authGroupRouter.get('/groups/:group_id/pix/:id', pixController.getById);
authGroupRouter.post('/groups/:group_id/pix', pixController.create);
authGroupRouter.put('/groups/:group_id/pix/:id', pixController.update);
authGroupRouter.delete('/groups/:group_id/pix/:id', pixController.delete);

export default authGroupRouter;