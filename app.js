const express = require('express');
const { config } = require('dotenv');
config();
const app = express();

const dbConnection = require('./config/db.config');

dbConnection()
const apiRoute = require('./routes/apiRoute');

app.use(express.json({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", 'x-access-token, Content-Type, Access-Control-Allow-Headers');
  res.header("Access-Control-Allow-Methods", 'GET, POST, DELETE, PUT');
  next();
});

app.use('/api', apiRoute);

module.exports = app;