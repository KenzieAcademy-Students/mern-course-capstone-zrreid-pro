const express = require('express');
const mongoose = require('mongoose');
const { Project, User, Task } = require('../models/index');
const { requireAuth } = require('../middleware/index');

const toId = mongoose.Types.ObjectId;

const router = express.Router();

// @GET /api/project - Private (retrieve all projects)
// TODO Delete later. for testing purposes only
router.get('/', requireAuth, async (req, res, next) => {
  try {
    const uid = req.user._id;

    console.log('REQ.USER', req.user);

    let user = await User.findOne({ _id: uid });

    if (!user) {
      return res.status(401).json({ error: 'You must be logged in.' });
    }

    const populateQuery = [{ path: 'user', select: 'project_list' }];

    const projectsIds = user.project_list;

    projectsIds.forEach(async (projectId) => {});

    const projects = await Project.find({});
    // .sort({ created: -1 })
    // .populate(populateQuery)
    // .exec();

    if (!projects) {
      return res.status(404).send('There are no projects yet.');
    }
    res.status(200).json({ projects, user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error.');
  }
});

// @GET /api/project:pid - Private (retrieve a specific project)
router.get('/:pid', requireAuth, async (req, res) => {
  const populateQuery = [
    { path: 'users', select: ['username', '_id'] },
    { path: 'tasks', select: ['objective', 'status', 'tags', 'assigned_user', '_id'] }
  ];

  // console.log(req.params.pid);

  const project = await Project.findById(toId(req.params.pid))
    .populate(populateQuery).exec();

  if(project) {
    return res.status(200).json(project);
  } else {
    return res.status(404).json({ error: 'Project does not exist' });
  }



  // try {
  //   const { pid } = req.params;
  //   const uid = req.user._id;

  //   const project = await Project.findOne({ _id: pid });

  //   // validation: if there is no project, return 404
  //   if (!project) {
  //     return res.status(404).json({ error: 'Project does not exist.' });
  //   }

  //   //validation: only users from project's users list can have access to the project
  //   if (!JSON.stringify(project.users).includes(JSON.stringify(uid))) {
  //     return res.status(401).json({ error: 'You do not have access.' });
  //   }

  //   return res.status(200).json(project);
  // } catch (error) {
  //   res.status(500).send('Server Error.');
  //   console.error(error.message);
  // }
});

// @POST /api/project - Private (create a new project)

//TODO
// 1. add validation: if project exists > return 400
// 2. validate tags (unique = true) on the backend

router.post('/', requireAuth, async (req, res) => {
  try {
    // user id
    // const uid = req.user._id;
    const { title, description, owner, categories, tags, users, tasks } = req.body;

    const user = await User.findOne({ _id: owner });

    // const owner = toId(uid);

    if (title.length === 0) {
      return res.status(400).json({ error: 'Please enter a project title.' });
    }

    // let project = await Project.findOne({ title: title });

    if (!user) {
      return res
        .status(401)
        .json({ error: 'User owner of the project has not been found.' });
    }

    // TODO revisit and review
    // validation: if the project already exists, reply with 400
    // if (project) {
    //   return res.status(400).json({
    //     error:
    //       'Project with this title already exists. Please choose a unique project name',
    //   });
    // }

    // if(!users.includes(owner)) {
    //   users.concat(owner);
    // };

    const project = new Project({
      title,
      description,
      categories,
      owner,
      tags,
      users,
      tasks
    });

    if (!project.users.includes(owner)) {
      project.users = project.users.concat(owner);
    }
    const savedProject = await project.save();

    user.project_list = user.project_list.concat(savedProject._id);
    console.log('USER', user);

    await user.save();

    res.status(200).json({ msg: 'Project created', savedProject });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error.');
    // next(error);
  }
});
// @PUT /api/project/:pid/category - Private (update the categories list of the specific project)
router.put('/:pid/category', requireAuth, async (req, res, next) => {
  try {
    const { pid } = req.params;
    const uid = req.user._id;
    const { categories } = req.body;

    let project = await Project.findById({ _id: pid });
    if (!project) {
      return res.status(404).send('This project does not exist.');
    }

    // validation: only the owner can delete the project
    if (JSON.stringify(project.owner) !== JSON.stringify(uid)) {
      return res.status(401).json({
        error:
          'You do not have permission to edit the project categories list.',
      });
    }

    // validation: you cannot pass an empty object
    if (!categories || categories.length < 1) {
      return res
        .status(400)
        .json({ error: 'Please send a valid categories update request.' });
    }

    // update the project categories
    const projectUpdate = await Project.findByIdAndUpdate(
      { _id: pid },
      {
        categories,
      },
      { new: true }
    );

    res.status(200).json({
      msg: 'Project categories have been successfully updated.',
      projectUpdate,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error.');
  }
});

// @PUT /api/project:pid/user - Private (update the user list of the specific project)
router.put('/:pid/user', requireAuth, async (req, res, next) => {
  try {
    const { pid } = req.params;
    const uid = req.user._id;
    const { users } = req.body;

    let project = await Project.findById({ _id: pid });
    if (!project) {
      return res.status(404).send('This project does not exist.');
    }
    // validation: only the owner can delete the project
    if (JSON.stringify(project.owner) !== JSON.stringify(uid)) {
      return res.status(401).json({
        error: 'You do not have permission to edit the project user list.',
      });
    }

    // validation: you cannot pass an empty object
    if (!users || users.length < 1) {
      return res
        .status(400)
        .json({ error: 'Please send a valid users update request.' });
    }

    //validation: no one can delete the project owner from the project's users list
    if (!JSON.stringify(users).includes(JSON.stringify(project.owner))) {
      return res.status(401).json({
        error: "You cannot modify the owner's access of this project.",
      });
    }

    // update the project
    const projectUpdate = await Project.findByIdAndUpdate(
      { _id: pid },
      {
        users,
      },
      { new: true }
    );

    res
      .status(200)
      .json({ msg: 'User list has been successfully updated.', projectUpdate });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error.');

    // next(error);
  }
});

// @DELETE /api/project:pid/ - Private (deletes the specified project, its task list and the specified project from the user's project list)
router.delete('/:pid', requireAuth, async (req, res) => {
  try {
    const { pid } = req.params;

    const uid = req.user._id;

    let project = await Project.findById({ _id: pid });
    if (!project) {
      return res.status(404).send('This project does not exist.');
    }

    // validation: only the owner can delete the project
    if (JSON.stringify(project.owner) !== JSON.stringify(uid)) {
      return res.status(401).json({ error: 'You do not have permission.' });
    }

    // delete specified project from the user's project list
    let user = await User.findById(uid);
    user.project_list = user.project_list.splice(
      user.project_list.indexOf(pid),
      1
    );
    user.save();
    // delete task list assosiated with the project, if any
    if (project.tasks.length > 0) {
      project.tasks.forEach(async (task) => {
        let tid = task._id;

        const removedTask = await Task.deleteOne({ _id: tid });
      });
    }

    const removedProject = await project.deleteOne({ _id: pid });

    res.status(200).json({ msg: 'Project deleted', removedProject });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error.');
  }
});

module.exports = router;
