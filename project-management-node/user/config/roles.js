const allRoles = {
  user: ['getUsers', 'getUser','manageUsers'],
  admin: ['getUsers', 'getUser','manageUsers'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
