import * as express from 'express';
import { register, login } from './users.controller';
import { ensureNotAuthenticated } from '../../middleware/authMiddleware';

const userRouter  = express.Router();

userRouter.post('/register', ensureNotAuthenticated, register);

userRouter.post('/login', ensureNotAuthenticated, login );

export { userRouter };
