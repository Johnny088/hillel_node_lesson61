import createHttpError from 'http-errors';
import { Task } from '../db/models/Tasks.js';

export const getTasks = async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
};

export const getTaskById = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  res.json(task);
};

export const addTask = async (req, res) => {
  const body = req.body;
  const newTask = await Task.create(body);
  res.status(201).json(newTask);
};

export const removeTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByIdAndDelete(id);
  res.json(task);
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const result = await Task.findByIdAndUpdate(id, body, {
    returnDocument: 'after',
  });
  if (!result) {
    throw createHttpError(404, "task isn't found");
  }
  res.json(result);
};

export const updateOrCreateTask = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const result = await Task.findByIdAndUpdate(id, body, {
    returnDocument: 'after',
    upsert: true,
    includeResultMetadata: true,
  });
  const isUpdated = result.lastErrorObject.updatedExisting;
  res.status(isUpdated ? 200 : 201).json(result.value);
};
