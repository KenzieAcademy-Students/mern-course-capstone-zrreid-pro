const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const taskSchema = new mongoose.Schema(
  {
    objective: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      required: true,
    },
    deadline: {
      type: Date,
      required: false,
    },
    tags: [
      {
        type: String,
      },
    ],
    notes: {
      type: String,
      required: false,
    },
    comments: [
      {
        text: {
          type: String,
          required: true,
          maxlength: 120,
        },
        author: {
          type: ObjectId,
          ref: 'User',
        },
        created: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    users: [
      {
        type: ObjectId,
        ref: 'User',
      },
    ],
    subtasks: [
      {
        type: ObjectId,
        ref: 'Task',
      },
    ],
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
