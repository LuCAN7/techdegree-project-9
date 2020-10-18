const express = require('express');
const router = express.Router();
const Course = require('../models/course');
const User = require('../models/user');

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
  asyncHandler(async (req, res, next) => {
    try {
      const courses = await Course.findAll({
        include: [
          {
            model: User,
          },
        ],
      });
      res.json(courses);
      res.status(200);
    } catch (error) {
      console.log('Something went wrong!', error);
    }
  })
);

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findOne({
      where: { id: id },
      include: [
        {
          model: User,
        },
      ],
    });

    if (course === null) {
      console.log('Course Not found!');
      res.sendStatus(404);
    }
  } catch (error) {
    throw error; // error caught in the asyncHandler's catch block
  }
});

router.post('/', async (req, res, next) => {
  try {
    const course = await Course.create(req.body);
    // console.log(course);

    // **sets the Location header to the URI for the course,
    return res.status(201).location('../courses');
  } catch (error) {
    // console.log('ERROR:', error.name);
    if (
      error.name === 'SequelizeValidationError' ||
      error.name === 'SequelizeUniqueConstraintError'
    ) {
      const err = error.errors.map((err) => err.message);
      res.status(400).json(err);
    } else {
      next(error);
      // throw error; // error caught in the asyncHandler's catch block
    }
  }
});

router.put('/:id', async (req, res, next) => {
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

    if (!course) {
      return res.status(404).send('Course not found');
    }

    res.status(204).send('Course has been updated');
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
});

router.delete('/:id', async (req, res, next) => {
  // Delete everyone named "Jane"
  const { id } = req.params;
  const course = await Course.destroy({
    where: {
      id: id,
    },
    // ,
    // include: [
    //   {
    //     model: User
    //   }
    // ]
  });
  req.status(204);
});

module.exports = router;
