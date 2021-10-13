// import 'dotenv/config'
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('logger');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const keys = require('./config/keys');
const router = require('./routes/index');
const { requestLogger, errorHandler } = require('./middleware/index');
require('dotenv').config();
const seedDatabase = require('./seedDatabase');
const seedDatabaseDemo = require('./seedDatabaseDemo');

const createError = require('http-errors');

mongoose.connect(keys.database.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

mongoose.connection.on('connected', () => {
  console.log('connected to mongoDB');
  // seedDatabase();
  // seedDatabaseDemo();
});

mongoose.connection.on('error', (err) => {
  console.log('err connecting', err);
});

const app = express();

// middleware
// app.use(logger('dev'));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(requestLogger);
app.use(morgan('common'));

app.use(express.static(path.join(__dirname, '../../client/build')));

// api router
app.use(keys.app.apiEndpoint, router);

if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build/index.html'));
  });
}


// catch 404 and forward to error handler
// app.use((req, res, next) => {
//   next(createError(404, 'NotFound'));
// });

// error handler
// app.use(errorHandler);

module.exports = app;
