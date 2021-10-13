import React from 'react';
import TaskCard from '../TaskCard';
import './ProfileView.scss';

export default function ProfileView({
    user,
    getStatusColor
}) {
    return (
        <div id='profileView' className='main-content'>
            <div className='profile-wrapper'>
                <h2 className='list-title'>Tasks</h2>
                {
                    user && user?.task_list?.map((task, index) => (
                        <TaskCard
                            key={task._id}
                            task={task}
                            mode={1}
                            statusColor={getStatusColor(task.status)}
                        />
                    ))
                }
            </div>
        </div>
    );
}