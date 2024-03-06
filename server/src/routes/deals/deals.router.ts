import * as express from 'express';
import { authMiddleware } from '../../middleware/authMiddleware'
import { handleDealsRequest } from './deals.controller';

const dealsRouter = express.Router();

dealsRouter.get('/', authMiddleware, handleDealsRequest)

export { dealsRouter };
