import * as express from 'express';
import { authMiddleware } from '../../middleware/authMiddleware'
import { getDeals } from './deals.controller';

const dealsRouter = express.Router();

dealsRouter.get('/', authMiddleware, getDeals);

export { dealsRouter }
