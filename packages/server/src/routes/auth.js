const express = require('express');
const { User } = require('../models/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const router = express.Router();

// @POST api/auth/signup - public - Signup
router.post('/signup', async (req, res) => {
  const { username, password, email, avatar } = req.body;

  //password username and email validations
  if (!password || !username || !email) {
    return res.status(422).json({ error: 'Please add all fields' });
  }

  if (password.split('').length < 8) {
    return res
      .status(400)
      .json({ error: 'The password must be between 8 and 20 characters' });
  }

  User.findOne({ email: email })
    .then((savedUser) => {
      if(savedUser) {
        return res.status(422).json({ error: 'User already exists with this email'});
      }

      bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new User({
          username,
          passwordHash: hashedPassword,
          email: email,
          avatar: avatar,
          project_list: []
        });

        user.save()
          .then((user) => {
            res.json({ message: 'Registration successful' });
          })
          .catch((error) => {
            console.log(`Registration Error: ${error}`);
          });
      })
    })
    .catch((error) => {
      console.log(`Searching Error: ${error}`);
    })

  // try {
  //   const { username, password, email, avatar } = req.body;

  //   //password username and email validations
  //   if (!password || !username || !email) {
  //     return res.status(422).json({ error: 'Please add all fields.' });
  //   }

  //   if (password.split('').length < 8) {
  //     return res
  //       .status(400)
  //       .json({ error: 'The password must be between 8 and 20 characters.!' });
  //   }

  //   let user = await User.findOne({ email });

  //   if (user) {
  //     return res
  //       .status(400)
  //       .json({ error: 'This email has already been registered.' });
  //   }

  //   //valudation - unique username
  //   let usernameAlreadyExists = await User.findOne({ username });

  //   if (usernameAlreadyExists) {
  //     return res
  //       .status(400)
  //       .json({ error: 'This username has already been taken.' });
  //   }

  //   const passwordHash = await bcrypt.hash(password, 12);

  //   user = new User({
  //     username,
  //     passwordHash,
  //     email,
  //     avatar,
  //   });

  //   user.save();

  //   res.status(200).json({ msg: 'User has been registered', user });
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).send('Server Error');
  // }
});

// @POST api/auth/signin - public - Signin
// TODO
// 1. create a query with project list (title, _id)
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  // validating user input
  if (!email || !password) {
    return res
      .status(422)
      .json({ error: 'Missing email or password.' });
  }

  const populateQuery = [
    {
      path: 'project_list',
      select: ['title', '_id']
    }
  ];

  const user = await User.findOne({ email: email })
    .populate(populateQuery).exec();

  // verify that user exists and the pw matches the user records
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  // validating email and password
  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, keys.jwt.secret);

  res.status(200)
    .send({
      token,
      username: user.username,
      email: user.email,
      uid: user._id,
      avatar: user.avatar,
      project_list: user.project_list
    })



  // try {
    

    

  //   let user = await User.findOne({ email });

  //   if (!user) {
  //     return res.status(404).json({ error: 'Invalid email or password.' });
  //   }

  //   // verify that user exists and the pw matches the user records
  //   const passwordCorrect =
  //     user === null ? false : await bcrypt.compare(password, user.passwordHash);

  //   // validating username and password
  //   if (!user && passwordCorrect) {
  //     return res.status(401).json({ error: 'Invalid email or password.' });
  //   }
  //   console.log('USER', user);
  //   const userForToken = {
  //     username: user.username,
  //     id: user._id,
  //   };

  //   const token = jwt.sign(userForToken, keys.jwt.secret);

  //   res.status(200).json({
  //     token,
  //     username: user.username,
  //     email: user.email,
  //     uid: user._id,
  //     avatar: user.avatar,
  //   });
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).send('Server Error');
  // }
});

module.exports = router;
