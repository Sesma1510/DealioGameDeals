import * as express from 'express';
import { getPagination } from '../../services/pagination';
import { handleDealsRequest } from './deals.controller';


const dealsRouter = express.Router();

dealsRouter.get('/', handleDealsRequest)

export { dealsRouter };
