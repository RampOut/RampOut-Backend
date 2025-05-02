import { Router } from 'express';
import type { RequestHandler } from 'express';
import { getAllHistorial, getByIdHistorial, createHistorial, updateHistorial, deleteHistorial, createAndUpdateTeamScore } from '../controllers/historialController';

const historialRouter: Router = Router();

historialRouter.get('/', getAllHistorial as RequestHandler);
historialRouter.get('/:id', getByIdHistorial as RequestHandler);
historialRouter.post('/', createHistorial as RequestHandler);
historialRouter.patch('/:id', updateHistorial as RequestHandler);
historialRouter.delete('/:id', deleteHistorial as RequestHandler);
historialRouter.post('/levelfin', createAndUpdateTeamScore as RequestHandler);

export default historialRouter;
