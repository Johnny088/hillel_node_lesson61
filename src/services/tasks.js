import { Task } from '../db/models/Tasks.js';

export const getTasksService = async ({
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
}) => {
  const skip = (page - 1) * limit;

  const tasksQuery = Task.find({ ownerId });

  if (status) {
    tasksQuery.where('status').equals(status);
  }

  if (isCompleted !== undefined) {
    tasksQuery.where('completed').equals(isCompleted);
  }

  if (minProgress) {
    tasksQuery.where('progress').gte(minProgress);
  }

  if (maxProgress) {
    tasksQuery.where('progress').lte(maxProgress);
  }

  if (search && search.trim()) {
    tasksQuery.where({
      title: { $regex: search, $options: 'i' },
    });
  }

  const [totalCount, tasks] = await Promise.all([
    tasksQuery.clone().countDocuments(),
    tasksQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder }),
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  return { tasks, totalCount, totalPages };
};

export const getTaskByIdService = (id, ownerId) =>
  Task.findOne({ _id: id, ownerId });

export const addNewTaskService = data => Task.create(data);

export const removeTaskService = (id, ownerId) =>
  Task.findOneAndDelete({ _id: id, ownerId });

export const updateTaskService = async (id, ownerId, data, options = {}) => {
  const result = await Task.findOneAndUpdate({ _id: id, ownerId }, data, {
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
