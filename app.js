const express = require('express');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');
const boolParser = require('express-query-boolean');
const heroesRouter = require('./routes/api/heroes');

const HttpCode = require('./helpers/constatns');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
require('dotenv').config();

const IMAGES_OF_HEROES = process.env.IMAGES_OF_HEROES;
app.use(express.static(path.join(__dirname, IMAGES_OF_HEROES)));
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(boolParser());

app.use('/api/heroes', heroesRouter);

app.use((req, res) => {
  res
    .status(HttpCode.NOT_FOUND)
    .json({ status: 'error', code: HttpCode.NOT_FOUND, message: 'Not found' });
});

app.use((err, req, res, next) => {
  const code = err.status || HttpCode.INTERNAL_SERVER_ERROR;
  const status = err.status ? 'error' : 'fail';
  res.status(code).json({ status, code, message: err.message });
});

module.exports = app;
