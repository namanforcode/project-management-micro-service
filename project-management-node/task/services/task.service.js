const { Task } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a task
 * @param {Object} taskBody
 * @returns {Promise<Task>}
 */
const createTask = async (taskBody) => {
  // Ensure that the 'owner' (user reference) exists and is valid
  // const { owner } = taskBody;
  // const userExists = await User.findById(owner); // Assuming you have a User model
  // if (!userExists) {
  //   throw new ApiError(400, 'Owner not found');
  // }

  // Check if task with the same name already exists for this owner
  // if (await Task.exists({ name: taskBody.name, owner: taskBody.owner })) {
  //   throw new ApiError(400, 'Task with this name already exists for this user');
  // }

  return Task.create(taskBody);
};

/**
 * Query for tasks
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryTasks = async (filter, options) => {
  const tasks = await Task.paginate(filter, options);
  return tasks;
};

/**
 * Get task by id
 * @param {ObjectId} id
 * @returns {Promise<Task>}
 */
const getTaskById = async (id) => {
  const task = await Task.findById(id);
  if (!task) {
    throw new ApiError(404, 'Task not found');
  }
  return task;
};

/**
 * Update task by id
 * @param {ObjectId} taskId
 * @param {Object} updateBody
 * @returns {Promise<Task>}
 */
const updateTaskById = async (taskId, updateBody) => {
  const task = await getTaskById(taskId);
  if (!task) {
    throw new ApiError(404, 'Task not found');
  }

  // If owner is being updated, validate that the new owner exists
  if (updateBody.owner) {
    const userExists = await User.findById(updateBody.owner); // Assuming User model exists
    if (!userExists) {
      throw new ApiError(400, 'New owner not found');
    }
  }

  // Apply updates and save
  Object.assign(task, updateBody);
  await task.save();
  return task;
};

/**
 * Delete task by id
 * @param {ObjectId} taskId
 * @returns {Promise<Task>}
 */
const deleteTaskById = async (taskId) => {
  const task = await getTaskById(taskId);
  if (!task) {
    throw new ApiError(404, 'Task not found');
  }
  // await task.remove();
  await task.deleteOne();
  return task;
};

module.exports = {
  createTask,
  queryTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
};
