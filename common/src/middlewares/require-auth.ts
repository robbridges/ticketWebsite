import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';

// not authorized middle wear, if there is not a current user on the request object in any of our routes that require it. (By passing in this middle wear, an error is thrown.)
export const requireAuth= (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  next();
}