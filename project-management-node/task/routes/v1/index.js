const express = require('express');
const taskRoute = require('./task.routes');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/',
    route: taskRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});


module.exports = router;
