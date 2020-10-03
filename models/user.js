const Sequelize = require('sequelize');
const sequelize = require('../db');
// const Course = require('./course');
// sequelize.models.User

const User = sequelize.define(
  'user',
  {
    // Model attributes are defined here
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: true,
    },
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    emailAddress: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'User', // We need to choose the model name
  }
);

// User.associate = (models) => {
//    User.hasMany(sequelize.Course);
// };

// User.hasMany(models.Course);

// the defined model is the class itself
// console.log(User === sequelize.models.User); // true
module.exports = User;
