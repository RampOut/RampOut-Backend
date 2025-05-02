// src/routes/viewsRoutes.ts
import { Router } from 'express';
import { getAllRankings, getDailyRankings } from '../controllers/rankingController';

const rankingRouter = Router();

rankingRouter.get('/rankings', getAllRankings);
rankingRouter.get('/rankings/daily', getDailyRankings);

export default rankingRouter;