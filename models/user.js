const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Sequelize.Model {}

  User.init(
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      emailAddress: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
    },
    {
      // Other model options go here
      sequelize, // We need to pass the connection instance
      modelName: 'User', // We need to choose the model name
    }
  );

  // the defined model is the class itself
  console.log(User === sequelize.models.User); // true
  return User;
};
