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
import {
  createTasksSchema,
  getTasksSchema,
  idSchema,
  updateTasksSchema,
} from '../validation/tasks.js';

const tasksRouter = Router();

tasksRouter.get('/', celebrate(getTasksSchema), getTasks);

tasksRouter.get('/:id', celebrate(idSchema), getTaskById);

tasksRouter.post('/', celebrate(createTasksSchema), addTask);

tasksRouter.delete('/:id', celebrate(idSchema), removeTask);

tasksRouter.patch('/:id', celebrate(updateTasksSchema), updateTask);

tasksRouter.put(
  '/:id',
  celebrate(createTasksSchema),
  celebrate(idSchema),
  updateOrCreateTask,
);

export default tasksRouter;
