import { Router } from 'express';
import 'dotenv/config';
import {
  addTask,
  getTaskById,
  getTasks,
  removeTask,
  updateOrCreateTask,
  updateTask,
} from '../controller/tasks.js';

const tasksRouter = Router();

tasksRouter.get('/tasks', getTasks);

tasksRouter.get('/tasks/:id', getTaskById);

tasksRouter.post('/tasks', addTask);

tasksRouter.delete('/tasks/:id', removeTask);

tasksRouter.patch('/task/:id', updateTask);

tasksRouter.put('/tasks/:id', updateOrCreateTask);

export default tasksRouter;
