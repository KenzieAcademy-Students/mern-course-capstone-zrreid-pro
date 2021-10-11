const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const taskSchema = new mongoose.Schema({
    objective: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: false
    },
    tags: [
        {
            tag: {
                type: String
            },
            color: {
                type: String
            }
        }
    ],
    notes: {
        type: String,
        required: false
    },
    comments: [
        {
           text: {
               type: String,
               required: true,
               maxlength: 120
           },
           author: {
               type: ObjectId,
               ref: 'User'
           },
           created: {
               type: Date,
               default: Date.now
           }
        }
    ],
    assigned_user: {
            type: ObjectId,
            ref: 'User'
    },
    subtasks: [
        {
            objective: {
                type: String
            },
            completed: {
                type: Boolean
            }
        }
    ],
    project: {
        type: ObjectId,
        ref: 'Project'
    }
    },
    { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;