'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
  // Model attributes are defined here
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Please enter in a firstname',
      },
      notNull: {
        msg: 'Please enter in a firstname',
      },
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Please enter in a lastname',
      },
      notNull: {
        msg: 'Please enter in a lastname',
      },
    },
  },
  emailAddress: {
    type: Sequelize.STRING,
    unique: {
      msg: 'User with this email already exist, Please try again',
    },
    isEmail: true,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'An email is required',
      },
      notNull: {
        msg: 'An email is required',
      },
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'A password is required',
      },
      notNull: {
        msg: 'A password is required',
      },
    },
  },
});

module.exports = User;
