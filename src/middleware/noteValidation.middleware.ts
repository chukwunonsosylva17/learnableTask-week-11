import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ZodSchema } from 'zod';
import { ValidationError } from '../utils/errorHandler';
import { noteValidationSchema } from "../validations/note.validation";



export const validateNote = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { error, value } = noteValidationSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    res.status(400).json({
      success: false,
      errors: error.details.map((detail) => detail.message),
    });
    return;
  }

  req.body = value;
  next();
};


// /**
//  * Validates a request body against a Zod schema.
//  * @param {ZodSchema<T>} schema - The Zod schema to validate against.
//  * @returns {RequestHandler} - A middleware function that validates the request body.
//  */
// export const validateRequest =
//   <T>(schema: ZodSchema<T>): RequestHandler =>
//   (req: Request, res: Response, next: NextFunction): void => {
//     const { body } = req;
//     if (!body) {
//       return next(new ValidationError('No request body'));
//     }

//     try {
//       schema.parse(body);
      
//       next();
//     } catch (error) {
//       if (error instanceof ValidationError) {
//         return next(error);
//       }

//       next(new ValidationError('Invalid request body'));
//     }
//   };

