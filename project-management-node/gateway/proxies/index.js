const expressProxy = require('express-http-proxy');

// Define service URLs
const services = {
  auth: 'http://localhost:3001',
  users: 'http://localhost:3002',
  project: 'http://localhost:3003',
  task: 'http://localhost:3004',
};

// Export proxy routes
const setupProxies = (app) => {
  app.use('/v1/auth', expressProxy(services.auth));
  app.use('/v1/users', expressProxy(services.users));
  app.use('/v1/project', expressProxy(services.project));
  app.use('/v1/task', expressProxy(services.task));
};

module.exports = setupProxies;
