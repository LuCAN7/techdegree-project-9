// Create the course routes
// Set up the following routes (listed in the format HTTP METHOD Route HTTP Status Code):

// [X] GET /api/courses 200 - Returns a list of courses (including the user that owns each course)
// [X] GET /api/courses/:id 200 - Returns the course (including the user that owns the course) for the provided course ID
// [X] POST /api/courses 201 - Creates a course, sets the Location header to the URI for the course, and returns no content
// [ ] PUT /api/courses/:id 204 - Updates a course and returns no content
// [ ] DELETE /api/courses/:id 204 - Deletes a course and returns no content

const express = require('express');
const router = express.Router();
const Course = require('../models/course');
const User = require('../models/user');

router.get('/', async (req, res, next) => {
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
});

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
    console.log(course);
  } catch (error) {
    console.error('Unable to get the course with that :id', error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const course = await Course.create(req.body);
    // **sets the Location header to the URI for the course,
    return res.status(201).location('../courses');
    // console.log(course);
  } catch (error) {
    // console.log('Unable to create course', error);
    res.status(500).json({ error: error.message });
  }
});

// router.put('/:id', async (req, res, next) => {
//   // Change everyone without a last name to "Doe"
//   const { id } = req.params;

//   const course = await Course.update(req.body, {
//     where: {
//       id: id,
//     },
//   });
//   res.status(204);
// });

// router.delete('/:id', async (req, res, next) => {
// Delete everyone named "Jane"
//   await User.destroy({
//     where: {
//       firstName: "Jane"
//     }
//   });
// });

module.exports = router;
