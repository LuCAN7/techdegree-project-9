const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const User = require('../models/user');

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users).status(200);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { firstName, lastName, emailAddress, password } = req.body;
    const user = await User.create({
      firstName,
      lastName,
      emailAddress,
      password,
    });
    res.location('/');
    res.json(user).status(201);
    // console.log({ user });
  } catch (error) {
    console.error('Unable to create user!', error);
  }
});

module.exports = router;
// const express = require('express');
// const router = express.Router();
// const sequelize = require('../db');
// const User = require('../models/user');

// router.get('/', async (req, res, next) => {
//   try {
//     console.log(await User.findAll());
//     res.status(200);
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// });

// router.post('/', async (req, res, next) => {
//   try {
//     const { firstName, lastName, emailAddress, password } = req.body;
//     await User.create({
//       firstName,
//       lastName,
//       emailAddress,
//       password,
//     });
//     res.location('/');
//     res.status(201);
//     // res.json({
//     //   message: 'Well Done!!',
//     // });
//   } catch (error) {
//     console.error('Unable to create user!', error);
//   }
// });

// module.exports = router;
