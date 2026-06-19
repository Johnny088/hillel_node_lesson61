import { Task } from '../db/models/Tasks.js';

export const getTasksService = async ({
  page,
  limit,
  sortBy,
  sortOrder,
  status,
  iscompleted,
  minProgress,
  maxProgress,
  search,
}) => {
  const skip = (page - 1) * limit;

  const tasksQuery = Task.find();

  if (status) {
    tasksQuery.where('status').equals(status);
  }

  if (iscompleted !== undefined) {
    tasksQuery.where('completed').equals(iscompleted);
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
