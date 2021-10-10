import mongoose, { connect, disconnect } from 'mongoose';
import chalk from 'chalk';
import { User, Project, Task } from './models';
import { users as userData } from './db/users';
import { projects as projectData } from './db/projects';
import { tasks as taskData } from './db/tasks';
import keys from './config/keys';
import bcrypt from 'bcryptjs';

const toId = mongoose.Types.ObjectId;

const colors = ['#FF0000', '#FF7000', '#18DA00', '#008DDA', '#000000', '#99CBDA', '#FCFF00'];
// const colors = [ Red,    Orange,     Green,   Sky Blue,    Black,   Pale Blue,   Yellow]

async function seedDatabase() {
    try {
        await mongoose.connect(keys.database.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        const users = await User.find({});
        const projects = await Project.find({});
        const tasks = await Task.find({});

        if(!users.length && !projects.length && !tasks.length) {
            console.log(
                chalk.yellow('No data found in the database, loading preset data...')
            );

            let uids = [];
            let tids = [];
            let pids = [];
            
            // Loads preset users
            for(let i = 0; i < userData.length; i++) {
                let passwordHash = await bcrypt.hash(userData[i].password, 12);
                let user = new User({
                    username: userData[i].username,
                    passwordHash: passwordHash,
                    email: userData[i].email,
                    avatar: userData[i].avatar,
                    project_list: [],
                    task_list: []
                });

                await user.save()
                    .then((savedUser) => {
                        uids.push(savedUser._id)
                    });
            }
            console.log(
                chalk.green('Preset users successfully created')
            );
            
            // Loads preset tasks
            for(let j = 0; j < taskData.length; j++) {
                let uid = Math.floor(Math.random() * 5);
                let task = new Task({
                    objective: taskData[j].objective,
                    status: taskData[j].status,
                    tags: [],
                    notes: taskData[j].notes,
                    comments: [],
                    assigned_user: uids[uid],
                    subtasks: [],
                    project: toId(1)
                });
                
                const savedTask = await task.save();

                tids.push(savedTask._id);

                await User.findByIdAndUpdate(
                    { _id: uids[uid] },
                    { $push: { task_list: savedTask._id } },
                    { new: true }
                );
            }
            console.log(
                chalk.green('Preset tasks successfully created')
            );
            
            // Loads preset projects
            for(let k = 0; k < projectData.length; k++) {
                let project = new Project({
                    title: projectData[k].title,
                    description: projectData[k].description,
                    owner: uids[3],
                    status_categories: projectData[k].status_categories,
                    tags: projectData[k].tags,
                    users: uids,
                    tasks: tids.slice((3*k), (3*(1+k)))
                });

                await project.save()
                    .then((savedProject) => {
                        pids.push(savedProject._id)
                    });
            }
            console.log(
                chalk.green('Preset projects successfully created')
            );

            // Updates the User's project list fields with the projects they work on
            for(let x = 0; x < uids.length; x++) {
                await User.findByIdAndUpdate(
                    { _id: uids[x] },
                    { project_list: pids },
                    { new: true }
                );
            }

            for(let a = 0; a < 3; a++) {
                await Task.findByIdAndUpdate(
                    { _id: tids[a] },
                    { project: pids[0] },
                    { new: true }
                );
            }

            for(let b = 3; b < 6; b++) {
                await Task.findByIdAndUpdate(
                    { _id: tids[b] },
                    { project: pids[1] },
                    { new: true }
                );
            }

            for(let c = 3; c < 6; c++) {
                await Task.findByIdAndUpdate(
                    { _id: tids[c] },
                    { project: pids[2] },
                    { new: true }
                );
            }

        } else {
            console.log(
                chalk.green('Database already initiated, proceeding with startup...')
            );
        }
    } catch (error) {
        console.log(
            chalk.red('Loading Preset Data Error: ', error)
        );
    }
}

module.exports = seedDatabase;