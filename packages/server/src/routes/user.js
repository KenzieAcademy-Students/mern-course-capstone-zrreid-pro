const express = require('express');
const { User } = require('../models/index');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await User.find({});

    res.status(200).json({users});
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

router.get('/sample', async (req, res, next) => {
  let user = await User.findOne({}).exec();

  if (!user) {
    const newUser = new User({
      username: 'Freddie',
    });
    user = await newUser.save();
  }

  res.status(200).send(user);
});

module.exports = router;
