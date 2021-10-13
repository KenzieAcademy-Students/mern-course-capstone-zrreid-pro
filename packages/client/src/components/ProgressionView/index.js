import React, { useState, useEffect }  from 'react';
import TaskCard from '../TaskCard';
import './ProgressionView.scss';

const sortTasks = (tasks) => {
    return tasks.reduce((obj, task) => (
        {...obj, [task.status]: [...(obj[task.status] || []), task]}
    ), {})
}

export default function ProgressionView({
    project: { title, status_categories, tasks, users },
    openTaskDetails,
    assignTask,
    getStatusColor
}) {
    const [ sortedTasks, setSortedTasks ] = useState({});
    const [ isLoading, setIsLoading ] = useState(true);
    const [ tid, setTID ] = useState();

    const handleEvent = (event, tid) => {
        if(!event.target.className.includes('ignore') && !event.target.className.includes('tippy-content')) {
            openTaskDetails(1, tid);
        }
    }

    useEffect(() => {
        if(status_categories && tasks) {
            setSortedTasks(sortTasks(tasks));
            setIsLoading(false);
        }

    }, [status_categories, tasks]);

    return (
        <div id='progressionView' className='view'>
            {
                !isLoading && (status_categories?.map((status, index) => (
                    <div className='wrapper' key={index}>
                        <h2 className='list-title'>{status.label}</h2>
                        <div className='statusList'>
                            {
                                sortedTasks[status.label]?.map((task) => (
                                    <TaskCard
                                        key={task._id}
                                        task={task}
                                        projectTitle={title}
                                        projectUsers={users}
                                        mode={0}
                                        handleEvent={handleEvent}
                                        assignTask={assignTask}
                                        statusColor={getStatusColor(task.status)}
                                    />
                                ))
                            }
                        </div>
                    </div>
                )))
            }
        </div>
    );
}