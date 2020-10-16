const Sequelize = require('sequelize');
const sequelize = require('../db');

const Course = sequelize.define(
  'Course',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'No course with that id',
        },
      },
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A title is required',
        },
        notEmpty: {
          msg: 'A title is required',
        },
      },
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A description is required',
        },
        notEmpty: {
          msg: 'A description is required',
        },
      },
    },
    estimatedTime: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    materialsNeeded: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  }
  // ,
  // {
  //   // Other model options go here
  //   sequelize, // We need to pass the connection instance
  //   modelName: 'Course', // We need to choose the model name
  // }
);

// Course.associate = (models) => {
//   Course.belongsTo(sequelize.User, {
//     // as: 'userId', // alias
//     foreignKey: {
//       fieldName: 'userId',
//       allowNull: false,
//     },
//   });
// };
// Course.belongsTo(User, { foreignKey: 'userId' });

module.exports = Course;
