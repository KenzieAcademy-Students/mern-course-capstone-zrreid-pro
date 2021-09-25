const express = require('express');
const { User } = require('../models/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const router = express.Router();

// @POST api/auth/signup - public - Signup
router.post('/signup', async (req, res, next) => {
  try {
    const { username, password, email, avatar } = req.body;

    //password username and email validations
    if (!password || !username || !email) {
      return res.status(422).json({ error: 'Please add all fields.' });
    }

    if (password.split('').length < 8) {
      return res
        .status(400)
        .json({ error: 'The password must be between 8 and 20 characters.!' });
    }

    let user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ error: 'This email has already been registered.' });
    }

    //valudation - unique username
    let isUniqueUsername = await User.findOne({username});

    if (!isUniqueUsername) {
      return res
        .status(400)
        .json({ error: 'This username has already been taken.' });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    user = new User({
      username,
      passwordHash,
      email,
      avatar,
    });

    user.save();

    res.status(200).json({ msg: 'User has been registered', user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// @POST api/auth/signin - public - Signin
// TODO
// 1. create a query with project list (title, _id)
router.post('/signin', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // validating user input
    if (!username || !password) {
      return res.status(422).json({ error: 'Missing username or password.' });
    }

    const user = await User.findOne({ username });

    // verify that user exists and the pw matches the user records
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);

    // validating username and password
    if (!user && passwordCorrect) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(userForToken, keys.jwt.secret);

    res
      .status(200)
      .send({ token, username, uid: user._id, avatar: user.avatar });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
