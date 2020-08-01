const express = require('express');

const app = express();
const apiRoute = require('./routes/apiRoute')
app.use(express.json({}));

app.use('/api', apiRoute);

module.exports = app;