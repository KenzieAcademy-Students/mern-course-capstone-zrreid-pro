const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    avatar: {
        pattern: {
            type: Number
        },
        color: {
            type: String
        }
    },
    project_list: [
        {
            type: ObjectId,
            ref: 'Project'
        }
    ],
    task_list: [
        {
            type: ObjectId,
            ref: 'Task'
        }
    ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;