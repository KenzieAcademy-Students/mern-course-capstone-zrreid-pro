const express = require('express');
const { User } = require('../models/index');

const router = express.Router();

router.post('/signup', async (req, res, next) => {
  try {
    const { username, password, email, avatar} = req.body;

    let user = await User.findOne({ email: email });

    if (user) {
      res.status(401).json({ msg: 'This email has already been registered.' });
    }

    user = new User({
      username,
      password,
      email,
      avatar,
    });

    user.save();

    res.status(200).json({msg:'User has been registered', user});
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
