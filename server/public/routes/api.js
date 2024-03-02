import express from 'express';
import { gamesRouter } from './games/games.controller';
const apiRouter = express.Router();
apiRouter.use('/games', gamesRouter);
export { apiRouter };
