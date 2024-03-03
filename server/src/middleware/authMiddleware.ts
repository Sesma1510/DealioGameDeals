import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

import { RequestWithUser } from '../types/types';

function authMiddleware(req: RequestWithUser, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new Error('Authentication failed!');
    }

    const decodedToken: any = jwt.verify(token, process.env.SECRET_kEY!);
    req.userId = decodedToken.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Authentication failed!' });
  }
};

export { authMiddleware };
