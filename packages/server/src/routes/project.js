const express = require('express');
const {Project} = require('../models/index');
const {requireAuth} = require('../middleware/index');

const router = express.Router();


// @GET /api/project - Private (retrieve all projects)
router.get('/', async (req, res, next) => {
  try {
    const projects = await Project.find({});

    if (projects) {
      res.status(200).json({projects});
    }

    // res.status(404).send
    next()
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error')
  }
})


// @GET /api/project:id - Private (retrieve a specific project)
// TODO: Put back requireAuth as middleware
router.get('/:id', async (req, res) => {
  try {
    //* verify the parsed search parameters
    const project = await Project.find({ _id: req.params.id });

    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({msg: 'Project does not exist.'});
    }
  } catch (error) {
    res.status(500).send('Server Error');
    console.error(error.message);
  }
});

// @POST /api/project - Private (create a new project)
// TODO: Put back requireAuth as middleware
router.post('/', async (req, res, next) => {
  try {
    const {title, description, owner, deadline, categories, tasks} = req.body;
    //* review this catch block and make adjustments
    let project = Project.findOne({title:title})

    if (project) {
      res.status(401).json({msg: 'Project with this title already exists. Please choose a unique project name'})
    }

    project = new Project({
      title,
      description,
      owner,
      deadline,
      categories,
      tasks,
    })

    project.save()

    res.status(200).json({msg: 'Project created', project});
  } catch (error) {
    res.status(500).send('Server Error');
    // next(error);
  }
});

// @PUT /api/project:id - Private (update a project)
// TODO: Put back requireAuth as middleware
router.put('/:id', async (req, res, next) => {
  try {
      let project = await Project.findById({_id:req.params.id})
      if (project) {



      } else {
          res.status(404).send();
      }
  } catch (error) {
    res.status(500).send('Server Error');
    next(error);
  }
});

module.exports = router;
