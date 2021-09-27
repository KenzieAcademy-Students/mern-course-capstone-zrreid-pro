import { connect, disconnect } from 'mongoose';
import chalk from 'chalk';
import { User, Project, Task } from './models';
import { users as userData } from './db/users';
import { projects as projectData } from './db/projects';
import { tasks as taskData } from './db/tasks';
import keys from './config/keys';
import bcrypt from 'bcryptjs';

async function seedDatabase() {
    try {
        await connect(keys.database.url, {
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
                    avatar: [],
                    project_list: []
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
                    users: [uids[uid]]
                });

                await task.save()
                    .then((savedTask) => {
                        tids.push(savedTask._id)
                    });
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
                    categories: projectData[k].categories,
                    tags: [],
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