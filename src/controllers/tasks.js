import createHttpError from 'http-errors';
import {
  addNewTaskService,
  getTaskByIdService,
  getTasksService,
  removeTaskService,
  updateTaskService,
} from '../services/tasks.js';
import { ID_NOT_FOUND_MSG } from '../constants.js';

export const getTasks = async (req, res) => {
  const { page, limit, sortBy, sortOrder, completed } = req.query;

  const response = await getTasksService({
    page,
    limit,
    sortBy,
    sortOrder,
    completed,
  });

  res.json(response);
};

export const getTaskById = async (req, res) => {
  const { id } = req.params;
  const task = await getTaskByIdService(id);

  if (!task) {
    throw createHttpError(404, ID_NOT_FOUND_MSG);
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
    throw createHttpError(404, ID_NOT_FOUND_MSG);
  }

  res.json(task);
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const result = await updateTaskService(id, body);

  if (!result) {
    throw createHttpError(404, ID_NOT_FOUND_MSG);
  }
  res.json(result.data);
};

export const updateOrCreateTask = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const { isUpdated, data } = await updateTaskService(id, body, {
    upsert: true,
  });
  res.status(isUpdated ? 200 : 201).json(data);
};
