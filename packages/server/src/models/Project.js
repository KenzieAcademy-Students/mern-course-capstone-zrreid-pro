import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
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
    deadline: {
        type: Date,
        required: false
    },
    categories: [
        {
            type: String,
            unique: true
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

export default Project;