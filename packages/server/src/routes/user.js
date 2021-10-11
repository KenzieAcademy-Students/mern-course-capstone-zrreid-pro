const express = require('express');
const { User } = require('../models/index');
const { requireAuth } = require('../middleware/index');
const bcrypt = require('bcryptjs');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await User.find({});

    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

router.get('/minimum', async (req, res) => {
  try {
    const users = await User.find({});
    // console.log(users)
    const reduced = users.map((user) => {
      return {
        _id: user._id,
        username: user.username,
        avatar: user.avatar
      }
    })
    res.status(200).json({ users: reduced });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// GET /api/user:id Public - retrieve a single user
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const populateQuery = [
      {
        path: 'project_list',
        select: [ '_id', 'title' ]
      },
      {
        path: 'task_list',
        select: [ '_id', 'objective', 'status', 'project' ],
          populate: { path: 'project', select: [ 'title' ] }
      }
    ];

    const user = await User.findById(id)
      .populate(populateQuery).exec();

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.status(200).send({
      username: user.username,
      email: user.email,
      uid: user._id,
      avatar: user.avatar,
      project_list: user.project_list
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// PUT /api/user:id Private - update a single user
router.put('/:id', requireAuth, async (req, res, next) => {
  try {
    const { newUsername, password, currentPassword } = req.body;
    const { id } = req.params;

    let user = await User.findOne({ username: newUsername });

    // username validation
    if (user) {
      return res
        .status(401)
        .json({ error: 'This username has already been registered.' });
    }

    user = await User.findById(id);

    const passwordCorrect = await bcrypt.compare(
      currentPassword,
      user.passwordHash
    );

    // password validation
    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: 'The password must be between 8 and 20 characters.' });
    }

    if (!passwordCorrect) {
      return res
        .status(401)
        .json({ error: 'Current password does not match with the records.' });
    }

    let userUpdate = {
      _id: id,
      new: true,
    };

    if (password !== undefined) {
      const newHashedPassword = await bcrypt.hash(password, 12);
      userUpdate.passwordHash = newHashedPassword;
    }

    if (newUsername !== undefined) {
      userUpdate.username = newUsername;
    }

    const updatedUser = await User.findByIdAndUpdate({ _id: id }, userUpdate);
    res.json({ msg: 'User profile has been updated.', updatedUser });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @DELETE /api/user:id Private - delete a single user
router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const { id } = req.params;

    let user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ error: 'User does not exist' });
    }

    user = await User.findByIdAndDelete({ _id: id });

    // res.status(200).json({msg: "User Account has been deleted"})
    res.status(200).json({ user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
