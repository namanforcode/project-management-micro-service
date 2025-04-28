const express = require('express');
const projectRoute = require('./project.routes');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/',
    route: projectRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});


module.exports = router;
