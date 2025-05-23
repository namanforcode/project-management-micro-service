const allRoles = {
  user:['getProjects', 'manageProjects'],
  admin: ['getProjects', 'manageProjects'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
