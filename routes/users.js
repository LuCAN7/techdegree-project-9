const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const User = require('../models/user');

// Aysnc Error Handler to wrap each route
// function asyncHandler(cb) {
//   return async (req, res, next) => {
//     try {
//       await cb(req, res, next);
//     } catch (error) {
//       res.status(500).send(error);
//       next(error);
//     }
//   };
// }

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
    if (
      error.name === 'SequelizeValidationError' ||
      error.name === 'SequelizeUniqueConstraintsError'
    ) {
      const errors = error.errors.map((err) => err.message);
      res.status(400).json({ errors });
    } else {
      // console.error('Unable to create user!', error);
      next(error);
    }
  }
});

module.exports = router;
