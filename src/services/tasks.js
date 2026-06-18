import { Task } from '../db/models/Tasks.js';

export const getTasksService = () => Task.find();

export const getTaskByIdService = id => Task.findById(id);

export const addNewTaskService = data => Task.create(data);

export const removeTaskService = id => Task.findByIdAndDelete(id);

export const updateTaskService = async (id, data, options) => {
  const result = await Task.findByIdAndUpdate(id, data, {
    returnDocument: 'after',
    includeResultMetadata: true,
    ...options,
  });
  if (!result.value) {
    return;
  }
  return {
    data: result.value,
    isUpdated: result.lastErrorObject.updatedExisting,
  };
};
