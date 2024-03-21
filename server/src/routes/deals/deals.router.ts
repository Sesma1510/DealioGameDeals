import * as express from 'express';
import { fetchInitialDeals, fetchDealsOnUserQuery} from './deals.controller';


const dealsRouter = express.Router();

dealsRouter.get('/initial', fetchInitialDeals );
dealsRouter.get('/search', fetchDealsOnUserQuery );

export { dealsRouter };
