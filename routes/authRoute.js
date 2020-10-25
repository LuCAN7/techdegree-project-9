const bcrypt = require('bcryptjs');
const auth = require('basic-auth');
const User = require('../models/user');
const Course = require('../models/course');

const authUser = async (req, res, next) => {
  const authorizationHeader = auth(req);

  if (authorizationHeader) {
    const { name, pass } = authorizationHeader;

    const user = await User.findOne({
      where: {
        emailAddress: name,
        // password: pass,
      },
      include: [
        {
          model: Course,
        },
      ],
    });

    if (user) {
      const authenticated = await bcrypt.compare(pass, user.password);
      if (authenticated) {
        req.currentUser = user;
        next();
        // res.status(200).json(user);
      } else {
        return res.status(401).json('Access Denied - User not authenticated!');
        // throw Error('User not authenticated!');
      }
    } else {
      return res.status(402).send('Not Found - User not found!');
    }
  } else {
    return res.status(400).send('Not Authorized - Name and Pass not found!');
    // throw Error('Cannot Authenticate');
  }
};

module.exports = authUser;
