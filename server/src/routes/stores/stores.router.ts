import * as express from 'express';
import { getStores, updateStores } from './stores.controller';
import { authMiddleware } from '../../middleware/authMiddleware';

const storesRouter = express.Router();

storesRouter.get('/', getStores);
storesRouter.post('/update',  authMiddleware, updateStores);

export { storesRouter };
