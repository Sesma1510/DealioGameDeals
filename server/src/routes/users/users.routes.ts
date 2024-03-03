
import * as express from 'express';
import { register, login } from './users.controller';

const userRouter  = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);

export { userRouter };
