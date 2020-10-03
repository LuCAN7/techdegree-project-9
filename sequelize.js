// //*****************//
// // Find package.json --scripts
// //*****************//
// "scripts": {
//   "test": "echo \"Error: no test specified\" && exit 1",
//   "start": "node server.js",
//   "dev": "nodemon server.js",
//   "db:reset": "npx sequelize-cli db:drop && npx sequelize-cli db:create && npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all"
// },

// //*****************//
// // Find config.json
// //*****************//
// {
// "development": {
//   "database": "products_development",
//   "host": "127.0.0.1",
//   "dialect": "postgres"
// },
// "test": {
//   "database": "projects_api_test",
//   "dialect": "postgres"
// },
// "production": {
//   "use_env_variable": "DATABASE_URL",
//   "dialect": "postgres",
//   "dialectOptions": {
//     "ssl": {
//       "rejectUnauthorized": false
//     }
//   }
// }
// }

// //*****************//
// // Find data.json
// //*****************//
// {
//   {
//       "firstName": "John",
//       "lastName": "Smith",
//       "email": "john.smith@smith.com",
//       "password": "superPass1"
//   },
//   {
//     "firstName": "Jane",
//     "lastName": "Smith",
//     "email": "jane@smith.com",
//     "password": "123456789"
//   }
// }
// //*****************//
// // Product Seeders
// //*****************//

// 'use strict';
// module.exports = {
// up: (queryInterface, Sequelize) => {
//   return queryInterface.bulkInsert('Products', [{
//     title: 'Apple AirPods',
//     description: "https://www.apple.com/airpods",
//     price: 199,
//     createdAt: new Date(),
//     updatedAt: new Date()
//   },
//   {
//     title: 'Apple iPhone Pro',
//     description: "https://www.apple.com/iphone-11-pro",
//     price: 1000,
//     createdAt: new Date(),
//     updatedAt: new Date()
//   },
//   {
//     title: 'Apple Watch',
//     description: "https://www.apple.com/watch",
//     price: 499,
//     createdAt: new Date(),
//     updatedAt: new Date()
//   },
//   {
//     title: 'Vespa Primavera',
//     description: "https://www.vespa.com/us_EN/vespa-models/primavera.html",
//     price: 3000,
//     createdAt: new Date(),
//     updatedAt: new Date()
//   },
//   {
//     title: 'New Balance 574 Core',
//     description: "https://www.newbalance.com/pd/574-core/ML574-EG.html",
//     price: 84,
//     createdAt: new Date(),
//     updatedAt: new Date()
//   },
//   {
//     title: 'Tribe Messenger Bike 004',
//     description: "https://tribebicycles.com/collections/messenger-series/products/mess-004-tx",
//     price: 675,
//     createdAt: new Date(),
//     updatedAt: new Date()
//   },
//   {
//     title: 'Stumptown Hair Bender Coffee',
//     description: "https://www.stumptowncoffee.com/products/hair-bender",
//     price: 16,
//     createdAt: new Date(),
//     updatedAt: new Date()
//   }], {});
// },
// down: (queryInterface, Sequelize) => {
//   return queryInterface.bulkDelete('Products', null, {});
// }
// };

// //*****************//
// // Routers - ./routes/index.js
// //*****************//
// const express = require('express');
// const controllers = require('../controllers');
// const router = express.Router();

// router.get('/', (req, res) => res.send('This is root!'))

// module.exports = router

// //*****************//
// // Controllers - ./controllers/index.js
// //*****************//
// const sequelize = require('./db');
// const { User, Project } = require('../models');

// const createUser = async (req, res) => {
//   try {
//       const user = await User.create(req.body);
//       return res.status(201).json({
//           user,
//       });
//   } catch (error) {
//       return res.status(500).json({ error: error.message })
//   }
// }

// const getAllUsers = async (req, res) => {
//   try {
//       const users = await User.findAll({
//           include: [
//               {
//                   model: Project
//               }
//           ]
//       });
//       return res.status(200).json({ users });
//   } catch (error) {
//       return res.status(500).send(error.message);
//   }

// const getUserById = async (req, res) => {
//   try {
//       const { id } = req.params;
//       const user = await User.findOne({
//           where: { id: id },
//           include: [
//               {
//                   model: Project
//               }
//           ]
//       });
//       if (user) {
//           return res.status(200).json({ user });
//       }
//       return res.status(404).send('User with the specified ID does not exists');
//   } catch (error) {
//       return res.status(500).send(error.message);
//   }
// }

// const updateUser = async (req, res) => {
//   try {
//       const { id } = req.params;
//       const [updated] = await User.update(req.body, {
//           where: { id: id }
//       });
//       if (updated) {
//           const updatedUser = await User.findOne({ where: { id: id } });
//           return res.status(200).json({ user: updatedUser });
//       }
//       throw new Error('User not found');
//   } catch (error) {
//       return res.status(500).send(error.message);
//   }
// };

// const deleteUser = async (req, res) => {
//   try {
//       const { id } = req.params;
//       const deleted = await User.destroy({
//           where: { id: id }
//       });
//       if (deleted) {
//           return res.status(204).send("User deleted");
//       }
//       throw new Error("User not found");
//   } catch (error) {
//       return res.status(500).send(error.message);
//   }
// };

// module.exports = {
//   createUser,
//   getAllUsers,
//   getUserById,
//   updateUser,
//   deleteUser
// }

// //*****************//
// // Express Server.js
// //*****************//

// const express = require('express')
// const routes = require('./routes');
// const bodyParser = require('body-parser')
// const { Product } = require('./models');

// const PORT = process.env.PORT || 3000
// const app = express()

// app.listen(PORT, () => {
// console.log(`Express server listening on port ${PORT}`)
// });

// app.get('/', (req, res) => {
// res.send("This is root!")
// })

// app.get('/products/:id', async (req, res) => {
//   try {
//       const { id } = req.params
//       const product = await Product.findByPk(id)
//       if (!product) throw Error('Product not found')
//       res.json(product)
//   } catch (e) {
//       console.log(e)
//       res.send('Product not found!')
//   }
// })

// //********************//
// MODELS
// //********************//
// // Projects.js
// module.exports = (sequelize, DataTypes) => {
// const User = sequelize.define('User', {
//   firstName: DataTypes.STRING,
//   lastName: DataTypes.STRING,
//   email: DataTypes.STRING,
//   password: DataTypes.STRING
// }, {});

// User.associate = function (models) {
//   // associations can be defined here
//   User.hasMany(models.Project, {
//     foreignKey: 'userId'
//   })
// };
// return User;
// };

// // Users.js
// module.exports = (sequelize, DataTypes) => {
// const Project = sequelize.define('Project', {
//   title: DataTypes.STRING,
//   imageUrl: DataTypes.STRING,
//   description: DataTypes.TEXT,
//   userId: DataTypes.INTEGER
// }, {});

// Project.associate = function (models) {
//   // associations can be defined here
//   Project.belongsTo(models.User, {
//     foreignKey: 'userId',
//     onDelete: 'CASCADE'
//   })
// };
// return Project;
// };
