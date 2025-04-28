const { Project } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a project
 * @param {Object} projectBody
 * @returns {Promise<Project>}
 */
const createProject = async (projectBody) => {
  // Ensure that the 'owner' (user reference) exists and is valid
  // const { owner } = projectBody;
  // const userExists = await User.findById(owner); // Assuming you have a User model
  // if (!userExists) {
  //   throw new ApiError(400, 'Owner not found');
  // }

  // Check if project with the same name already exists for this owner
  // if (await Project.exists({ name: projectBody.name, owner: projectBody.owner })) {
  //   throw new ApiError(400, 'Project with this name already exists for this user');
  // }

  return Project.create(projectBody);
};

/**
 * Query for projects
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryProjects = async (filter, options) => {
  const projects = await Project.paginate(filter, options);
  return projects;
};

/**
 * Get project by id
 * @param {ObjectId} id
 * @returns {Promise<Project>}
 */
const getProjectById = async (id) => {
  const project = await Project.findById(id);
  if (!project) {
    throw new ApiError(404, 'Project not found');
  }
  return project;
};

/**
 * Update project by id
 * @param {ObjectId} projectId
 * @param {Object} updateBody
 * @returns {Promise<Project>}
 */
const updateProjectById = async (projectId, updateBody) => {
  const project = await getProjectById(projectId);
  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  // If owner is being updated, validate that the new owner exists
  if (updateBody.owner) {
    const userExists = await User.findById(updateBody.owner); // Assuming User model exists
    if (!userExists) {
      throw new ApiError(400, 'New owner not found');
    }
  }

  // Apply updates and save
  Object.assign(project, updateBody);
  await project.save();
  return project;
};

/**
 * Delete project by id
 * @param {ObjectId} projectId
 * @returns {Promise<Project>}
 */
const deleteProjectById = async (projectId) => {
  const project = await getProjectById(projectId);
  if (!project) {
    throw new ApiError(404, 'Project not found');
  }
  // await project.remove();
  await project.deleteOne();
  return project;
};

module.exports = {
  createProject,
  queryProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
};
