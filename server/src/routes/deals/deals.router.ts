import * as express from 'express';
import { getDeals } from './deals.controller';

const dealsRouter = express.Router();

dealsRouter.get('/', getDeals);

export { dealsRouter }
