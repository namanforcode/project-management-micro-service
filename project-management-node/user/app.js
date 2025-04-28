const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const routes = require('./routes/v1');
const ApiError = require('./utils/ApiError');
const config = require('./config/config');
const logger = require('./config/logger');
const { errorConverter, errorHandler } = require('./middlewares/error');
const morgan = require('./config/morgan');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}
// Routes and middleware
app.use('/', routes);
app.use((req, res, next) => next(new ApiError(404, 'Not found')));
app.use(errorConverter);
app.use(errorHandler);

// Global server reference
let server;

mongoose.connect(config.mongoose.url).then(() => {
  logger.info('Connected to MongoDB');

  server = app.listen(config.port, () => {
    logger.info(`Listening User service to port ${config.port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
