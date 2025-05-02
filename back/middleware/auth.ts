import { HydratedDocument } from 'mongoose';
import { IUserFields } from '../types';
import { NextFunction, Request, Response } from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import User, { JWT_SECRET } from '../models/User';

export interface RequestWithUser extends Request {
  user: HydratedDocument<IUserFields>;
}

const auth = async (expressReq: Request, res: Response, next: NextFunction) => {
  try {
    const req = expressReq as RequestWithUser;

    const jwtToken = req.get('Authorization')?.replace('Bearer ', '');

    if (!jwtToken) {
      res.status(401).send({ error: 'No Token Provided' });
      return;
    }

    const decoded = jwt.verify(jwtToken, JWT_SECRET) as { _id: string };

    const user = await User.findOne({ _id: decoded._id, token: jwtToken });

    if (!user) {
      res.status(401).send({ error: 'User not found or invalid token' });
      return;
    }

    req.user = user;
    next();
  } catch (e) {
    if (e instanceof TokenExpiredError) {
      res.status(401).send({ error: 'your Token is expired' });
    } else {
      res.status(401).send({ error: 'PLease log in to auth' });
    }
  }
};

export default auth;
