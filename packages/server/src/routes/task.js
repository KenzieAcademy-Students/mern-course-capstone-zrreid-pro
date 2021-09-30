const express = require('express');
const mongoose = require('mongoose');
const { User, Project, Task } = require('../models/index');
const requireAuth = require('../middleware/requireAuth');
const chalk = require('chalk');
const toId = mongoose.Types.ObjectId;

const router = express.Router();

router.get('/:tid', requireAuth, async (req, res) => {
    const populateQuery = [
        {
            path: 'comments',
            populate: { path: 'author', select: ['username'] }
        },
        {
            path: 'assigned_user', select: ['username', 'avatar']
        },
        {
            path: 'subtasks', select: ['objective', 'status', 'assigned_user', '_id']
        }
    ];

    const task = await Task.findById(req.params.tid)
        .populate(populateQuery).exec();
    
    if(task) {
        return res.status(200).json(task);
    } else {
        return res.status(404).json({ error: 'Task does not exist' });
    }
});

module.exports = router;