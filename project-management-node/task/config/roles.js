const allRoles = {
  user:['getTasks', 'manageTasks'],
  admin: ['getTasks', 'manageTasks'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
