const Sequelize = require('sequelize');
const sequelize = require('../db');
// const Course = require('./course');
// sequelize.models.User

const User = sequelize.define(
  'User',
  {
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
      validation: {
        notEmpty: {
          msg: 'Please enter in a firstname',
        },
      },
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validation: {
        notEmpty: {
          msg: 'Please enter in a lastname',
        },
      },
    },
    emailAddress: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validation: {
        notEmpty: {
          msg: 'An email is required',
        },
      },
    },
    password: {
      type: Sequelize.STRING,
      // type: Sequelize.VIRTUAL,
      allowNull: false,
      validation: {
        notEmpty: {
          msg: 'A password is required',
        },
      },
    },
    // confirmedPassword: {
    //   type: Sequelize.STRING,
    //   allowNull: false,
    //   set(val) {
    //     if (val === password) {
    //       const hashedPassword = bcrypt.hashSync(val, 10);
    //       setDataValue('confirmedPassword', hashedPassword);
    //     }
    //   },
    //   validate: {
    //     notNull: {
    //       msg: 'Both passwords must match'
    //     }
    //   }
    // },
  }
  // ,
  // {
  //   // Other model options go here
  //   sequelize, // We need to pass the connection instance
  //   modelName: 'User', // We need to choose the model name
  // }
);

// User.associate = (models) => {
//    User.hasMany(sequelize.Course);
// };

// User.hasMany(models.Course);

// the defined model is the class itself
// console.log(User === sequelize.models.User); // true
module.exports = User;
