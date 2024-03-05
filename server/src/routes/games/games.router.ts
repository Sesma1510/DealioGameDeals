import * as express from 'express';
import { authMiddleware } from '../../middleware/authMiddleware';
import { fetchGamesList } from './games.controller';

const gamesRouter = express.Router();

// gamesRouter.get('/', authMiddleware, fetchGamesList);
gamesRouter.get('/', fetchGamesList);


export { gamesRouter }
