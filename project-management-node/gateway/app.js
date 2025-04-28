const express = require('express');
const setupProxies = require('./proxies');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// Proxy routes
setupProxies(app);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error('Gateway Error:', err);
  res.status(500).json({ message: 'Internal Gateway Error' });
});

module.exports = app;
