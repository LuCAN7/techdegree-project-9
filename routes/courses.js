// Create the course routes
// Set up the following routes (listed in the format HTTP METHOD Route HTTP Status Code):

// [X] GET /api/courses 200 - Returns a list of courses (including the user that owns each course)
// [ ] GET /api/courses/:id 200 - Returns the course (including the user that owns the course) for the provided course ID
// [ ] POST /api/courses 201 - Creates a course, sets the Location header to the URI for the course, and returns no content
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

// router.get('/courses/:id', async (req, res, next) => {});
// router.post('/courses', async (req, res, next) => {});
// router.put('/courses/:id', async (req, res, next) => {
// Change everyone without a last name to "Doe"
// await User.update({ lastName: "Doe" }, {
//   where: {
//     lastName: null
//   }
// });
// });
// router.delete('/courses/:id', async (req, res, next) => {
// Delete everyone named "Jane"
//   await User.destroy({
//     where: {
//       firstName: "Jane"
//     }
//   });
// });

module.exports = router;
