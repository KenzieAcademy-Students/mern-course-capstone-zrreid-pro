import React from 'react';
import TaskCard from '../TaskCard';
import './ListView.scss';

export default function ListView({
    project,
    openTaskDetails,
    assignTask,
    getStatusColor
}) {

    const handleEvent = (event, tid) => {
        if(!event.target.className.includes('ignore') && !event.target.className.includes('tippy-content')) {
            openTaskDetails(1, tid);
        }
    }

    return (
        <div id='listView' className='view'>
            <div className='listView-container'>
                <h2 className='list-title'>Tasks</h2>
                <div className='taskList'>
                    {project?.tasks?.map((task, index) => (
                        <TaskCard
                            key={task._id}
                            task={task}
                            projectTitle={project?.title}
                            projectUsers={project?.users}
                            mode={0}
                            handleEvent={handleEvent}
                            assignTask={assignTask}
                            statusColor={getStatusColor(task.status)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}