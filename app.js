'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
// const Sequelize = require('sequelize');
const sequelize = require('./db');
const User = require('./models/user');
const Course = require('./models/course');

const routes = require('./routes/index');
const userRoutes = require('./routes/users');
const courseRoutes = require('./routes/courses');
// const authRoute = require('./routes/authRoute');

// variable to enable global error logging
const enableGlobalErrorLogging =
  process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

// set our port
app.set('port', process.env.PORT || 5000);

// setup morgan which gives us http request logging
app.use(morgan('dev'));
app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: false }));

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.log(err);
  });

User.hasMany(Course);
// Create Model Associates
Course.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

sequelize
  .sync()
  .then(() => {
    // start listening on our port
    app.listen(app.get('port'), () => {
      console.log(`Express server is listening on port...5000`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// TODO setup your api routes here
app.use('/', routes);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});
