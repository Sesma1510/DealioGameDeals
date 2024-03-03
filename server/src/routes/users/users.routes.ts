import * as express from 'express';
import { register, login } from './users.controller';

const userRouter  = express.Router();

userRouter.post('/register', (req, res, next) => {
  register(req, res).catch(next);
});

userRouter.post('/login', (req, res, next) => {
  login(req, res).catch(next);
});

export { userRouter };
