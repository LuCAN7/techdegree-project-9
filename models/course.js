const Sequelize = require('sequelize');
const sequelize = require('../db');

const Course = sequelize.define(
  'Course',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: true,
    },
    // userId: {
    //   type: Sequelize.INTEGER,
    //   onDelete: 'CASCADE',
    //   references: {
    //     model: 'Users',
    //     key: 'id',
    //     as: 'userId',
    //   },
    // },
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.TEXT,
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
