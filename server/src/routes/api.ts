import * as express from 'express';
import { gamesRouter } from '../routes/games/games.router';
import { dealsRouter } from '../routes/deals/deals.router';

const api = express();

api.use('/games', gamesRouter);
api.use('/deals', dealsRouter);

export { api };
