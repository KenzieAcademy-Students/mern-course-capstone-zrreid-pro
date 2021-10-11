import React, { useState } from 'react';
// import { Modal, useDisclosure } from '@chakra-ui/react';
import TaskCard from '../TaskCard';
// import { TaskCard } from '../../Display';
// import TaskDetail from '../TaskDetail';
import './ListView.scss';

export default function ListView({
    project,
    openTaskDetails,
    assignTask,
    getStatusColor
}) {
    // const { isOpen, onOpen, onClose } = useDisclosure();
    // const [ tid, setTID ] = useState();

    // const temporaryFix = (uid) => {
    //     for(let i = 0; i < users.length; i++) {
    //         if(users[i]._id === uid) {
    //             return users[i].username;
    //         }
    //     }
    // }

    const handleEvent = (event, tid) => {
        // console.log('fire')
        // console.log(event.target);
        // onOpen(event);
        if(!event.target.className.includes('ignore') && !event.target.className.includes('tippy-content')) {
            // setTID(tid);
            // onOpen(event);
            openTaskDetails(1, tid);
            // console.log(tid);
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

            {/* <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <TaskDetail tid={tid}/>
            </Modal> */}
        </div>
    );
}