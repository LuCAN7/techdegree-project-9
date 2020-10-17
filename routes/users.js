const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('basic-auth');
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

// function authUser ( req, res, next){
//   // const auth = (Authorization header set);
// }

router.get('/', async (req, res, next) => {
  try {
    const { name, pass } = auth(req);
    // console.log(name, pass);
    const users = await User.findOne({
      where: {
        emailAddress: name,
      },
    });
    if (users) {
      bcrypt.compare(pass, users.password, function (err, result) {
        // res === true
        res.json(users).status(200);
        console.log(result);
      });
    } else {
      res.status(401).send('User not Found!');
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
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
      // console.error('Unable to create user!', error);
      next(error);
    }
  }
});

module.exports = router;
