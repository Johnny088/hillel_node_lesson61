import createHttpError from 'http-errors';
import {
  addNewTaskService,
  getTaskByIdService,
  getTasksService,
  removeTaskService,
  updateTaskService,
} from '../services/tasks.js';
import { idNotFound } from '../constants.js';

export const getTasks = async (req, res) => {
  const tasks = await getTasksService();
  res.json(tasks);
};

export const getTaskById = async (req, res) => {
  const { id } = req.params;
  const task = await getTaskByIdService(id);

  if (!task) {
    throw createHttpError(404, idNotFound);
  }

  res.json(task);
};

export const addTask = async (req, res) => {
  const body = req.body;
  const newTask = await addNewTaskService(body);

  res.status(201).json(newTask);
};

export const removeTask = async (req, res) => {
  const { id } = req.params;

  const task = await removeTaskService(id);
  if (!task) {
    throw createHttpError(404, idNotFound);
  }

  res.json(task);
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const result = await updateTaskService(id, body);

  if (!result) {
    throw createHttpError(404, idNotFound);
  }
  res.json(result.data);
};

export const updateOrCreateTask = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const { isUpdated, data } = await updateTaskService(id, body);
  res.status(isUpdated ? 200 : 201).json(data);
};
