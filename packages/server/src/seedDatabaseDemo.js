import mongoose, { connect, disconnect } from 'mongoose';
import chalk from 'chalk';
import { User, Project, Task } from './models';
import { users2 as userData } from './db/users2';
import keys from './config/keys';
import bcrypt from 'bcryptjs';

const toId = mongoose.Types.ObjectId;

const colors = ['#FF0000', '#FF7000', '#18DA00', '#008DDA', '#000000', '#99CBDA', '#FCFF00'];
// const colors = [ Red,    Orange,     Green,   Sky Blue,    Black,   Pale Blue,   Yellow]

async function seedDatabaseDemo() {
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

                await user.save();
            }

            console.log(
                chalk.green('Preset users successfully created')
            );

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

module.exports = seedDatabaseDemo;