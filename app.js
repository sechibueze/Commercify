const express = require('express');
const { config } = require('dotenv');
config();
const app = express();

const dbConnection = require('./config/db.config');

dbConnection()
const apiRoute = require('./routes/apiRoute');

app.use(express.json({}));

app.use('/api', apiRoute);

module.exports = app;