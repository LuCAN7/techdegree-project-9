const express = require('express');
const Sequelize = require('sequelize');
const router = express.Router();

// setup a friendly greeting for the root route
router.get('/', (req, res, next) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

module.exports = router;
