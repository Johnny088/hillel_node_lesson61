import { Task } from '../db/models/Tasks.js';

export const getTasksService = async ({
  page,
  limit,
  sortBy,
  sortOrder,
  completed,
}) => {
  const skip = (page - 1) * limit;

  const statusQuery = Task.find();

  if (completed !== undefined) {
    statusQuery.where('completed').equals(completed);
  }

  const [totalCount, tasks] = await Promise.all([
    statusQuery.clone().countDocuments(),
    statusQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder }),
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  return { tasks, totalCount, totalPages };
};

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
    return null;
  }
  return {
    data: result.value,
    isUpdated: result.lastErrorObject.updatedExisting,
  };
};
