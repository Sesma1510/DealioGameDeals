import * as express from 'express';
import { gamesRouter } from '../routes/games/games.router';
import { dealsRouter } from '../routes/deals/deals.router';
import { userRouter } from '../routes/users/users.routes';

const api = express();

api.use('/users', userRouter);

api.use('/games', gamesRouter);
api.use('/deals', dealsRouter);

export { api };
