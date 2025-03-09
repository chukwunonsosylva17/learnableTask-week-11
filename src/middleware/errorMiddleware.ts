import { Request, Response, NextFunction } from 'express';
import { BaseError } from '../utils/errorClasses';

export const errorHandler = (
  err: Error | BaseError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof BaseError)
    return res.status(err.statusCode).json({ status: err.status, message: err.message });


  // For unexpected errors
  console.error('ERROR: ', err);
  return res.status(500).json({
    status: 'error',
    message: 'Something went wrong'
  });
};



