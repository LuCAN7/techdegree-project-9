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
      let { firstName, lastName, emailAddress, password } = req.body;
      let hashedPassword;
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }

      await User.create({
        firstName,
        lastName,
        emailAddress,
        password: hashedPassword,
      });

      return res.status(201).set('Location', '/').end();
    } catch (error) {
      if (
        error.name === 'SequelizeValidationError' ||
        error.name === 'SequelizeUniqueConstraintsError'
      ) {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ Errors: errors });
      } else {
        next(error);
      }
    }
  })
);

module.exports = router;
