import { Joi, Segments } from 'celebrate';
import { PRIORITY_STATE } from '../constants.js';
import { isValidObjectId } from 'mongoose';

export const createTasksSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(10).required().messages({
      'any.required': 'Field title is required',
    }),
    completed: Joi.boolean.default(false),
    priority: Joi.string.valid(...PRIORITY_STATE).required(),
    progress: Joi.number.min(0).max(100).default(0),
  }),
};

export const updateTasksSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(10),
    completed: Joi.boolean.default(false),
    priority: Joi.string.valid(...PRIORITY_STATE),
    progress: Joi.number.min(0).max(100).default(0),
  }).min(1),
};

export const validateId = () => {};
