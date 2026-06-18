import { Router } from 'express';
import 'dotenv/config';
import {
  addTask,
  getTaskById,
  getTasks,
  removeTask,
  updateOrCreateTask,
  updateTask,
} from '../controllers/tasks.js';

const tasksRouter = Router();

tasksRouter.get('/', getTasks);

tasksRouter.get('/:id', getTaskById);

tasksRouter.post('/', addTask);

tasksRouter.delete('/:id', removeTask);

tasksRouter.patch('/:id', updateTask);

tasksRouter.put('/:id', updateOrCreateTask);

export default tasksRouter;
