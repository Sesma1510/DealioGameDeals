import * as express from 'express';
import { dealsRouter } from '../routes/deals/deals.router';

const api = express();

api.use('/deals', dealsRouter);

export { api };
