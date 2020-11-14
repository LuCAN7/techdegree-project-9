'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Course = require('../models/course');
const authUser = require('../routes/authRoute');

// Aysnc Error Handler to wrap each route
function asyncHandler(cb) {
  return (req, res, next) => {
    try {
      cb(req, res, next);
    } catch (error) {
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
            attributes: {
              exclude: ['password'],
            },
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

    // console.log(course);
    if (course === null) {
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
      const course = await Course.create(req.body);
      const user = req.currentUser;

      return res.status(201).location(`/api/courses/${course.id}`).end();
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
      const course = await Course.findByPk(id);

      if (course) {
        if (req.currentUser.id === course.userId) {
          await Course.update(req.body, {
            where: {
              id: id,
            },
            include: [
              {
                model: User,
              },
            ],
          });
          return res.status(204).end();
        } else {
          res
            .status(403)
            .send('Cannot Update - Course belongs to another User');
        }
      } else {
        res.status(404).send('Course not found');
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
      if (req.currentUser.id === course.userId) {
        await Course.destroy({ where: { id: id } });

        return res.status(204).end();
      } else {
        res.status(403).send('Cannot Delete - Course belongs to another User');
      }
    } else {
      throw new Error('User not found');
    }
  })
);

module.exports = router;
