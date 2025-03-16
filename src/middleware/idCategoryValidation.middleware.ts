// src/middleware/validation.ts
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { idParamSchema } from "../validations/category.validation";

export const validateIdParam = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { error } = idParamSchema.validate({ id: req.params.id });

  if (error) {
    res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
    return;
  }

  next();
};

interface ValidationErrorDetail {
    field: string;
    message: string;
}

// export const validate = (schema: Joi.Schema) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     const { error } = schema.validate(req.body, {
//       abortEarly: false,
//       allowUnknown: false
//     });

        export const validate = (schema: Joi.Schema) => {
            return (req: Request, res: Response, next: NextFunction): void => {
                const { error } = schema.validate(req.body);
                if (error) {
                    const errors: ValidationErrorDetail[] = error.details.map((detail) => ({
                        field: detail.path[0] as string,
                        message: detail.message
                    }));
                    
                    res.status(400).json({
                        status: 'error',
                        message: 'Validation failed',
                        errors
                    });
                    return;
                }

                next();
            };
        };
        
      
  

    