import * as express from 'express';
import { fetchGamesList } from './games.controller';

const gamesRouter = express.Router();

gamesRouter.get('/', fetchGamesList);

export { gamesRouter }
