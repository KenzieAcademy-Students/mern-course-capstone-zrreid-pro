const express = require('express');
const projectRouter = require('./project');
const taskRouter = require('./task');
const userRouter = require('./user');
const authRouter = require('./auth');

const router = express.Router();


router.use('/project', projectRouter);
router.use('/task', taskRouter);
router.use('/user', userRouter);
router.use('/auth', authRouter);


module.exports = router;