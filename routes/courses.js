'use strict';

const express = require('express');
const router = express.Router();
// const bycrpt = require('bcryptjs');
const User = require('../models/user');
const Course = require('../models/course');
const authUser = require('../routes/authRoute');

// Aysnc Error Handler to wrap each route
function asyncHandler(cb) {
  return (req, res, next) => {
    try {
      cb(req, res, next);
    } catch (error) {
      res.status(500).send(error);
      next(error);
    }
  };
}

router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    try {
      const courses = await Course.findAll({
        include: [
          {
            model: User,
          },
        ],
      });
      return res.status(200).json(courses);
    } catch (error) {
      throw error;
    }
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const course = await Course.findByPk(id);

    if (course === null) {
      console.log('Not found!');
      res.status(404).send('Not found!');
    } else {
      // console.log(course.toJSON());
      return res.status(200).json(course);
    }
  })
);

router.post(
  '/',
  authUser,
  asyncHandler(async (req, res, next) => {
    try {
      await Course.create(req.body);
      const user = req.currentUser;
      // **NEED to rewrite - redirect w/ .location() //;
      return res.status(201).location('../courses').end();
    } catch (error) {
      if (
        error.name === 'SequelizeValidationError' ||
        error.name === 'SequelizeUniqueConstraintError'
      ) {
        const err = error.errors.map((err) => err.message);
        res.status(400).json(err);
      } else {
        next(error);
      }
    }
  })
);

router.put(
  '/:id',
  authUser,
  asyncHandler(async (req, res, next) => {
    try {
      const { id } = req.params;
      const [course] = await Course.update(req.body, {
        where: {
          id: id,
        },
        include: [
          {
            model: User,
          },
        ],
      });

      if (course) {
        res.status(204).send('Course has been updated');
      } else {
        return res.status(404).send('Course not found');
      }
    } catch (error) {
      if (
        error.name === 'SequelizeValidationError' ||
        error.name === 'SequelizeUniqueConstraintError'
      ) {
        const err = error.errors.map((err) => err.message);
        res.status(400).json(err);
      } else {
        next(error);
      }
    }
  })
);

router.delete(
  '/:id',
  authUser,
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const course = await Course.findByPk(id);

    if (course) {
      await Course.destroy({ where: { id: id } });
      // console.log('DELETED', id);
      return res.status(204).send('Course was deleted');
    } else {
      throw new Error('User not found');
    }
  })
);

module.exports = router;
