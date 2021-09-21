const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
  },
  owner: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  deadline: {
    type: Date,
    required: false,
  },
  users: [
    {
      type: ObjectId,
      ref: 'User',
    },
  ],
  categories: [
    {
      type: String,
      unique: true,
    },
  ],
  tasks: [
    {
      type: ObjectId,
      ref: 'Task',
    },
  ],
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
