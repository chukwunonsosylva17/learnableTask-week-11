import { Request, Response, NextFunction } from 'express';

interface RequestLog {
  method: string;
  path: string;
  timestamp: Date;
  params?: Record<string, unknown>;
  query?: Record<string, unknown>;
}

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req || !req.method || !req.path) {
    console.error('API Request: Missing required request information');
    return next(new Error('Missing required request information'));
  }

  const log: RequestLog = {
    method: req.method,
    path: req.path,
    timestamp: new Date(),
    params: req.params || {},
    query: req.query || {}
  };

  console.log('API Request:', log);
  next();
};
