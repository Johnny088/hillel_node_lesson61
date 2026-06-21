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
  const {
    page,
    limit,
    sortBy,
    sortOrder,
    status,
    isCompleted,
    minProgress,
    maxProgress,
    search,
  } = req.query;

  const ownerId = req.user._id;

  const response = await getTasksService({
    page,
    limit,
    sortBy,
    sortOrder,
    status,
    isCompleted,
    minProgress,
    maxProgress,
    search,
    ownerId,
  });

  res.json(response);
};

export const getTaskById = async (req, res) => {
  const { id } = req.params;
  const ownerId = req.user._id;

  const task = await getTaskByIdService(id, ownerId);

  if (!task) {
    throw createHttpError(404, ID_NOT_FOUND_MSG);
  }

  res.json(task);
};

export const addTask = async (req, res) => {
  const body = req.body;
  const ownerId = req.user.id;

  const newTask = await addNewTaskService({ ...body, ownerId });

  res.status(201).json(newTask);
};

export const removeTask = async (req, res) => {
  const { id } = req.params;
  const ownerId = req.user._id;

  const task = await removeTaskService(id, ownerId);
  if (!task) {
    throw createHttpError(404, ID_NOT_FOUND_MSG);
  }

  res.json(task);
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const ownerId = req.user._id;

  const result = await updateTaskService(id, ownerId, body);

  if (!result) {
    throw createHttpError(404, ID_NOT_FOUND_MSG);
  }
  res.json(result.data);
};

export const updateOrCreateTask = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const ownerId = req.user._id;

  const { isUpdated, data } = await updateTaskService(id, ownerId, body, {
    upsert: true,
  });
  res.status(isUpdated ? 200 : 201).json(data);
};
