import { HydratedDocument } from 'mongoose';
import { IUserFields } from '../types';
import { Error } from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { error } from 'console';
import { JWT_SECRET } from '../models/User';

export interface RequestWithUser extends Request {
  user: HydratedDocument<IUserFields>;
}

const auth = async (expressReq: Request, res: Response, next: NextFunction) => {
  try {
    const req = expressReq as RequestWithUser;

    const jwtToken = req.get('Authorization')?.replace('bearer', '');

    if (!jwtToken) {
      res.status(401).send({ error: 'No Token Provided' });
      return;
    }

    const decoded = jwt.verify(jwtToken, JWT_SECRET) as { _id: string };
  } catch (e) {
    if (e instanceof TokenExpiredError) {
      res.status(401).send({ error: 'your Token is expired' });
    } else {
      res.status(401).send({ error: 'PLease log in to auth' });
    }
  }
};
