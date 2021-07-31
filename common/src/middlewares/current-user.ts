import {Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string,
  email: string,
}
// we have to add a UserPayLoad to the typescript request type, so that it allows us to set a currentUser on the request 
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}
export const currentUser = (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify( req.session?.jwt, process.env.JWT_TOKEN!) as UserPayload;
    req.currentUser= payload;
  } catch (err) {

  }

  next();
};