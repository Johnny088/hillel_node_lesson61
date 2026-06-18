import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  addTask,
  getTaskById,
  getTasks,
  removeTask,
  updateOrCreateTask,
  updateTask,
} from '../controllers/tasks.js';
import { createTasksSchema, updateTasksSchema } from '../validation/tasks.js';

const tasksRouter = Router();

tasksRouter.get('/', getTasks);

tasksRouter.post('/', celebrate(createTasksSchema), addTask);

tasksRouter.get('/:id', getTaskById);

tasksRouter.delete('/:id', removeTask);

tasksRouter.patch('/:id', celebrate(updateTasksSchema), updateTask);

tasksRouter.put('/:id', celebrate(createTasksSchema), updateOrCreateTask);

export default tasksRouter;
