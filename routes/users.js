'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const authUser = require('./authRoute');

// Aysnc Error Handler to wrap each route
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

router.get(
  '/',
  authUser,
  asyncHandler((req, res) => {
    const user = req.currentUser;
    // console.log(user);
    res.status(200).json({
      login: user.emailAddress,
      name: user.firstName,
    });
  })
);

router.post(
  '/',
  asyncHandler(async (req, res, next) => {
    try {
      const { firstName, lastName, emailAddress, password } = req.body;

      if (password) {
        const user = await User.findOne({
          where: {
            emailAddress: emailAddress,
          },
        });
        // console.log('USER 1 is -->', user);

        if (user === null) {
          const hashedPassword = await bcrypt.hash(password, 10);

          await User.create({
            firstName,
            lastName,
            emailAddress,
            password: hashedPassword,
          });
          res.status(201).set('Location', '/').end();
        } else {
          res.status(403).send('email already exist');
        }
      } else {
        res.send('pasword required');
      }
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
  })
);

module.exports = router;
