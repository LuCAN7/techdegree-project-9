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
      res.status(500).send(error);
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
      const salt = 10;

      const user = await User.findOne({
        where: {
          emailAddress: emailAddress,
        },
      });

      if (emailAddress !== user.emailAddress) {
        const hashedPassword = await bcrypt.hash(password, salt);
        User.build({
          firstName,
          lastName,
          emailAddress,
          password: hashedPassword,
        });
        res.json(user).status(201);
      } else {
        res.status(401).send('Email already in use!');
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
