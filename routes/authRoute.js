'use strict';

const bcrypt = require('bcryptjs');
const auth = require('basic-auth');
const User = require('../models/user');

const authUser = async (req, res, next) => {
  try {
    // Parse the user's credentials from the Authorization header.
    const credentials = auth(req);

    if (credentials) {
      const { name, pass } = credentials;
      const user = await User.findOne({
        where: {
          emailAddress: name,
        },
      });

      if (user) {
        const authenticated = await bcrypt.compare(pass, user.password);

        if (authenticated) {
          req.currentUser = user;
          next();
        } else {
          // Return a response with a 401 Unauthorized HTTP status code.
          return res
            .status(401)
            .send('Access Denied - User not authenticated!');
        }
        // If user authentication failed...
      } else {
        res.status(402).send('Not Found - User not found!');
      }
    } else {
      res.status(400).send('Not Authorized - Name and Pass not found!');
    }
  } catch (error) {
    let errorMessage = {};
    res.status(401).json({ errorMessage: 'Access Denied!' });
  }
};

module.exports = authUser;
