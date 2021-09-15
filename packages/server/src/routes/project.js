const express = require('express');
const Project = require('../models/project');
const requireAuth = require('../middleware/index');

const router = express.Router();

// @GET /api/project:id - Private (retrieve a specific project)
router.get('/:id', requireAuth, async (req, res) => {
  try {
    //* verify the parsed search parameters
    const project = await Project.find({ _id: req.params.id });

    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    res.status(500).send('Server Error');
    console.error(error.message);
  }
});

// @POST /api/project - Private (create a new project)
router.post('/', requireAuth, async (req, res, next) => {
  try {
    //* review this catch block and make adjustments
  } catch (error) {
    res.status(500).send('Server Error');
    next(error);
  }
});

// @PUT /api/project:id - Private (update a project)
router.put('/:id', requireAuth, async (req, res, next) => {
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
