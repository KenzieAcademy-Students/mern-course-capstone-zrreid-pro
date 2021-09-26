const express = require('express');
const mongoose = require('mongoose');
const { User, Project, Task } = require('../models/index');
const requireAuth = require('../middleware/requireAuth');
const chalk = require('chalk');

const toId = mongoose.Types.ObjectId;

const router = express.Router();

// TEST ROUTE
router.get('/', requireAuth, async (req, res, next) => {
  const tasks = await Task.find({});

  res.status(200).json(tasks);
});

// TEST ROUTE
router.delete('/deleteall', requireAuth, async (req, res, next) => {
  let tasks = await Task.find({});

  tasks.forEach(async (task) => {
    let deletedTask = await Task.findByIdAndDelete(task._id);
  });

  res.status(200).json({ msg: 'all deleted', tasks });
});

// @POST api/task/:pid - Private - creates a new task under the parent project
router.post('/:pid', requireAuth, async (req, res, next) => {
  try {
    const {
      objective,
      status,
      deadline,
      tags,
      notes,
      comments,
      users,
      subtasks,
    } = req.body;

    const { pid } = req.params;
    const userId = req.user._id;

    //validation: Parent ProjectId
    if (!pid) {
      return res
        .status(400)
        .json({ error: 'Please provide a parent project ID.' });
    }

    let project = await Project.findById(pid);

    //valudation: Only Project users can post new tasks
    if (!project) {
      return res.status(400).json({ error: 'Parent project does not exist.' });
    }

    //validation: Status
    if (!status) {
      return res.status(400).json({ error: 'Please enter a status.' });
    }

    //valudation: Only Project users can post new tasks
    if (!project.users.includes(userId)) {
      return res.status(401).json({
        error: 'You do not have permission to add a task to this project.',
      });
    }

    const task = new Task({
      objective,
      status,
      deadline,
      tags,
      notes,
      comments,
      users,
      subtasks,
    });

    const savedTask = await task.save();

    // update parent project
    project.tasks = project.tasks.concat(toId(savedTask._id));
    await project.save();

    res.status(200).json({ msg: 'Task successfully created.', savedTask });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// @POST api/task/:tid/substask - Private - creates a substask under the parent task
router.post('/:tid/subtask', requireAuth, async (req, res, next) => {
  try {
    const { objective, status, deadline, tags, notes, comments, users } =
      req.body;

    //TODO pid is not provided; discuss with Zak
    const { pid } = req.body;

    const { tid } = req.params;
    const userId = req.user._id;

    //validation: Parent ProjectId
    if (!pid) {
      return res
        .status(400)
        .json({ error: 'Please provide a parent project ID.' });
    }

    let project = await Project.findById(pid);

    //valudation: parent project must exist
    if (!project) {
      return res.status(400).json({ error: 'Parent project does not exist.' });
    }

    //valudation: Only Project users can post new tasks
    if (!project.users.includes(userId)) {
      return res.status(401).json({
        error: 'You do not have permission to add a task to this project.',
      });
    }

    // validation: parent task exists
    let parentTask = await Task.findById(tid);

    if (!parentTask) {
      return res.status(400).json({ error: 'Parent task does not exist.' });
    }

    //validation: Status
    if (!status) {
      return res.status(400).json({ error: 'Please enter a status.' });
    }

    // create new task
    const subTask = new Task({
      objective,
      status,
      deadline,
      tags,
      notes,
      comments,
      users,
    });

    // save task to the db
    const savedSubTask = await subTask.save();

    // update parent task
    parentTask.subtasks = parentTask.subtasks.concat(toId(savedSubTask._id));
    await parentTask.save();

    res
      .status(200)
      .json({ msg: 'Subtask successfully created.', savedSubTask });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});
// @PUT api/task/:tid - Private - updates the specified task
// TODO This request is the same as the following 2 PUT requests. discuss refactoring later
// router.put('/:tid', requireAuth, async (req, res, next) => {
//   try {
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server Error');
//   }
// });

// @PUT api/task/:tid/user - Private - updates the users list (assigned to the task) of the specified task
router.put('/:tid/user', requireAuth, async (req, res, next) => {
  try {
    const { pid, users } = req.body;

    const { tid } = req.params;
    const userId = req.user._id;

    //validation: project id must be provided
    if (!pid) {
      return res
        .status(400)
        .json({ error: 'Please provide the parent project ID.' });
    }

    const project = await Project.findById(pid);

    //valudation: parent project must exist
    if (!project) {
      return res.status(400).json({ error: 'Parent project does not exist.' });
    }

    //valudation: Only Project owner can edit users assigned to the task
    if (!(JSON.stringify(project.owner) === JSON.stringify(userId))) {
      return res.status(401).json({
        error:
          'You do not have permission to modify assigned users for this task.',
      });
    }

    let task = await Task.findById(tid);

    // validation: specified task must exist
    if (!task) {
      return res.status(400).json({ error: 'Task not found.' });
    }

    //TODO come back and modify the users list on the backend
    task.users = users;
    const taskUpdated = await task.save();

    res.status(200).json({
      msg: 'Task users list has been successfully updated.',
      taskUpdated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});
// @PUT /api/task/:tid/comment - Private - adds a new comment to the specified Task
//TODO currently we can only add comments, but not edit or remove them.
router.put('/:tid/comment', requireAuth, async (req, res, next) => {
  try {
    const { pid, comment } = req.body;

    const { tid } = req.params;
    const userId = req.user._id;

    //validation: project id must be provided
    if (!pid) {
      return res
        .status(400)
        .json({ error: 'Please provide the parent project ID.' });
    }

    const project = await Project.findById(pid);

    //valudation: parent project must exist
    if (!project) {
      return res.status(400).json({ error: 'Parent project does not exist.' });
    }

    //valudation: Only Project users can create comments
    if (!project.users.includes(userId)) {
      return res.status(401).json({
        error: 'You do not have permission to add comments for this task.',
      });
    }

    let task = await Task.findById(tid);

    // validation: specified task must exist
    if (!task) {
      return res.status(400).json({ error: 'Task not found.' });
    }

    task.comments = task.comments.concat(comment);
    const taskUpdated = await task.save();

    res.status(200).json({
      msg: 'Task comment has been successfully added.',
      taskUpdated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});
// TODO 
// 1. remove task from the parent project model
// @DELETE /api/task/:tid - Private - deletes the task, all substasks associated with it and removes tasks reference from the parent project
router.delete('/:tid', requireAuth, async (req, res, next) => {
  try {
    const { pid } = req.body;

    const { tid } = req.params;
    const userId = req.user._id;

    //validation: project id must be provided
    if (!pid) {
      return res
        .status(400)
        .json({ error: 'Please provide the parent project ID.' });
    }

    let project = await Project.findById(pid);

    //valudation: parent project must exist
    if (!project) {
      return res.status(400).json({ error: 'Parent project does not exist.' });
    }

    //valudation: Only Project owner can edit users assigned to the task
    if (!(JSON.stringify(project.owner) === JSON.stringify(userId))) {
      return res.status(401).json({
        error:
          'You do not have permission to delete this task.',
      });
    }

    let task = await Task.findById(tid);

    // validation: specified task must exist
    if (!task) {
      return res.status(400).json({ error: 'Task not found.' });
    }

    //find all the subtasks and delete them
    if(task.subtasks.length > 0) {
        task.subtasks.forEach(async (subTask) => {
            const subtaskDeleted = await Task.findByIdAndDelete(subTask._id);
        })
    }

    // find the parent project and remove the reference id to the taskDeleted
    project.tasks = project.tasks.splice(project.tasks.indexOf((tid)), 1);
    await project.save();
    console.log(chalk.red('PROJECT',project))

    const taskDeleted = await Task.findOneAndDelete(tid);

    res.status(200).json({msg: "Task has been successfully deleted.", taskDeleted});
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
