const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const authUser = require('./authRoute');

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

router.get('/', authUser, (req, res) => {
  const user = req.currentUser;

  res.status(200).json({
    login: user.emailAddress,
    name: user.firstName,
  });
});

router.post('/', async (req, res, next) => {
  try {
    const { firstName, lastName, emailAddress, password } = req.body;
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      firstName,
      lastName,
      emailAddress,
      password: hashedPassword,
    });
    // res.location('/');
    res.json(user).status(201);
  } catch (error) {
    if (
      error.name === 'SequelizeValidationError' ||
      error.name === 'SequelizeUniqueConstraintsError'
    ) {
      const errors = error.errors.map((err) => err.message);
      res.status(400).json({ errors });
    } else {
      next(error);
    }
  }
});

module.exports = router;
