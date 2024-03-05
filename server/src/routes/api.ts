import * as express from 'express';
import { gamesRouter } from '../routes/games/games.router';
import { dealsRouter } from '../routes/deals/deals.router';
import { userRouter } from '../routes/users/users.router';
import { storesRouter } from '../routes/stores/stores.router';

const api = express();

api.use('/users', userRouter);

api.use('/stores', storesRouter);
api.use('/games', gamesRouter);
api.use('/deals', dealsRouter);

export { api };
