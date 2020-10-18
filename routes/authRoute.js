const bcrypt = require('bcryptjs');
const auth = require('basic-auth');
const User = require('../models/user');

const authUser = async (req, res, next) => {
  const authorizationHeader = auth(req);

  if (authorizationHeader) {
    const { name, pass } = authorizationHeader;

    const user = await User.findOne({
      where: {
        emailAddress: name,
        // password: pass,
      },
    });

    if (user) {
      const authenticated = await bcrypt.compare(pass, user.password);
      if (authenticated) {
        req.currentUser = user;
        res.status(200).json(user);
      } else {
        res.status(401).json('Access Denied - User not authenticated!');
        // throw Error('User not authenticated!');
      }
    } else {
      res.status(401).send('Not Found - User not found!');
    }
  } else {
    res.status(400).send('Not Authorized - Name and Pass not found!');
    //   // throw Error('Cannot Authenticate');
    next();
  }
};

module.exports = authUser;
