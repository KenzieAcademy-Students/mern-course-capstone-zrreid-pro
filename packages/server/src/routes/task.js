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
            populate: { path: 'author', select: [ 'username' ] }
        },
        {
            path: 'assigned_user', select: [ 'username', 'avatar' ]
        },
        {
            path: 'subtasks', select: [ '_id', 'objective', 'status', 'assigned_user' ]
        }
    ];

    const task = await Task.findById(toId(req.params.tid))
        .populate(populateQuery).exec();
    
    if(task) {
        return res.status(200).json(task);
    } else {
        return res.status(404).json({ error: 'Task does not exist' });
    }
});

router.post('/:pid', requireAuth, async (req, res) => {
    const { objective, status, notes } = req.body;
    const { pid } = req.params;

    try {
        const task = new Task({
            objective: objective,
            status: status,
            tags: [],
            notes: notes,
            comments: [],
            subtasks: [],
            project: pid
        });

        const savedTask = await task.save();

        try {
            await Project.findByIdAndUpdate(
                { _id: pid },
                { $push: { tasks: savedTask._id } },
                { new: true }
            );
        } catch (error) {
            console.log(
                chalk.red('Failed to update the tasks field of the current project')
            );
        }
        //look into changing the rest of the instances of _id to their more specific label
        // return res.status(200).json({
        //     _id: savedTask._id,
        //     objective: savedTask.objective,
        //     status: savedTask.status,
        //     tags: savedTask.tags,
        //     assigned_user: {}
        // });

        return res.status(200).json({
            _id: savedTask._id,
            objective: savedTask.objective,
            status: savedTask.status,
            tags: savedTask.tags
        });

    } catch (error) {
        console.log(
            chalk.red('Task Creation Error:', error)
        );
        res.status(500).json({ message: 'Task Creation Failure'});
    }
});

router.put('/:tid/update', requireAuth, async (req, res) => {
    const { objective, status, notes } = req.body;
    const { tid } = req.params;

    try {
        await Task.findByIdAndUpdate(
            { _id: tid },
            {
                objective: objective,
                status: status,
                notes: notes 
            },
            { new: true }
        );

        return res.status(200).send('Task updated');
    } catch (error) {
        console.log(
            chalk.red(`Task Update Error: ${error}`)
        );
        res.status(500).json({ message: 'Task Update Failure'});
    }
});

module.exports = router;