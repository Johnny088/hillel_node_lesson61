import { Joi, Segments } from 'celebrate';
import { PRIORITY_STATE, STATUS } from '../constants.js';
import { isValidObjectId } from 'mongoose';

const validateId = (id, utils) =>
  isValidObjectId(id) ? id : utils.message('Invalid Id');

export const getTasksSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(5).max(20).default(5),
    sortBy: Joi.string()
      .valid('title', 'completed', 'priority', 'progress')
      .default('title'),
    sortOrder: Joi.string().valid('asc', 'desc').default('asc'),
    status: Joi.string().valid(...STATUS),
    iscompleted: Joi.boolean(),
    minProgress: Joi.number().positive().max(100),
    maxProgress: Joi.number().positive().max(100),
  }),
};

export const createTasksSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(10).required().messages({
      'any.required': 'Field title is required',
    }),
    completed: Joi.boolean().default(false),
    priority: Joi.string()
      .valid(...PRIORITY_STATE)
      .required(),
    progress: Joi.number().min(0).max(100).default(0),
    status: Joi.string().valid(...STATUS),
  }),
};

export const updateTasksSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(10),
    completed: Joi.boolean().default(false),
    priority: Joi.string().valid(...PRIORITY_STATE),
    progress: Joi.number().min(0).max(100).default(0),
    status: Joi.string().valid(...STATUS),
  }).min(1),
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().custom(validateId).required(),
  }),
};

export const idSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().custom(validateId).required(),
  }),
};
