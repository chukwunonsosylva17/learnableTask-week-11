// src/validation/schemas.ts
import Joi from 'joi';
import { ObjectId } from 'mongodb';

export const noteSchema = Joi.object({
  title: Joi.string().min(3).max(100).required().messages({
    'string.empty': 'Title is required',
    'string.min': 'Title must be at least {#limit} characters',
    'string.max': 'Title cannot exceed {#limit} characters'
  }),
  content: Joi.string().min(10).required().messages({
    'string.empty': 'Content is required',
    'string.min': 'Content must be at least {#limit} characters'
  }),
  categoryId: Joi.string()
    .custom((value, helpers) => {
      if (!ObjectId.isValid(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    })
    .required()
    .messages({
      'any.invalid': 'Invalid category ID format',
      'any.required': 'Category ID is required'
    }),
  dueDate: Joi.date().iso().greater('now').optional().messages({
    'date.base': 'Due date must be a valid date',
    'date.iso': 'Due date must be in ISO 8601 format',
    'date.greater': 'Due date must be in the future'
  })
});

export const categorySchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least {#limit} characters',
    'string.max': 'Name cannot exceed {#limit} characters'
  }),
  color: Joi.string()
    .pattern(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .default('#ffffff')
    .messages({
      'string.pattern.base': 'Color must be a valid hex code'
    })
});

export const updateNoteSchema = noteSchema.fork(
  ['title', 'content', 'categoryId', 'dueDate'],
  (schema) => schema.optional()
);