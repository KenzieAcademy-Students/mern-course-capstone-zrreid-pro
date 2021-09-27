import React from 'react';
import TaskCard from '../TaskCard';
import './ProjectDetail.scss';

export default function ProjectDetail({
    project: { description, tasks, users }
}) {
    const temporaryFix = (uid) => {
        for(let i = 0; i < users.length; i++) {
            if(users[i]._id === uid) {
                return users[i].username;
            }
        }
    }

    return (
        <div id='projectDetail' className='view'>
            <p className='project-description'>{description}</p>

            <div className='taskAssignment'>
                <div className='unassigned'>
                    <h2 className='list-title'>Unassigned</h2>
                    <div className='taskList'>
                        {tasks?.map((task, index) => (
                            task.users.length === 0 ? <TaskCard key={index} mode={0} task={task} /> : <></>))}
                    </div>
                </div>
                <div className='assigned'>
                    <h2 className='list-title'>Assigned</h2>
                    <div className='taskList'>
                        {tasks?.map((task, index) => (
                            task.users.length > 0 ? <TaskCard key={index} mode={0} task={task} username={temporaryFix(task.users[0])}/> : <></>))}
                    </div>
                </div>
            </div>
        </div>
    );
}