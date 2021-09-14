const express = require('express');
const Project = require('../models/project');


const router = express.Router();


router.get('/:id', async (req,res) => {

    try {

        
        
    } catch (error) {

        res.status(500).send('Server Error');
        console.error(error.message);
    }

});


module.exports = router;