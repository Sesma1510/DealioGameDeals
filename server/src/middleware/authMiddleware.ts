import { Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import 'dotenv/config';

import { RequestWithUser } from '../types/types';

function authMiddleware(req: RequestWithUser, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new Error('Authentication failed!');
    }

    const decodedToken: any = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;
    req.userId = decodedToken.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Authentication failed!' });
  }
};

function ensureNotAuthenticated(req: RequestWithUser, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;
      return res.redirect('/');
    }
    next();
  } catch (err) {
    next();
  }
}


export { authMiddleware, ensureNotAuthenticated };
