const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    owner: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    status_categories: [
        {
            label: {
                type: String
            },
            color: {
                type: String
            }
        }
    ],
    deadline: {
        type: Date,
        required: false
    },
    tags: [
        {
            label: {
                type: String
            },
            color: {
                type: String
            }
        }
    ],
    users: [
        {
            type: ObjectId,
            ref: 'User'
        }
    ],
    tasks: [
        {
            type: ObjectId,
            ref: 'Task'
        }
    ]
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;