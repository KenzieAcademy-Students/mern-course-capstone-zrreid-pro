import React, { useState } from 'react';
import { Modal, useDisclosure } from '@chakra-ui/react';
import TaskCard from '../TaskCard';
import TaskDetail from '../TaskDetail';
import './ListView.scss';

export default function ListView({
    project: { title, tasks, users }
}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ tid, setTID ] = useState();

    const temporaryFix = (uid) => {
        for(let i = 0; i < users.length; i++) {
            if(users[i]._id === uid) {
                return users[i].username;
            }
        }
    }

    const handleEvent = (event, tid) => {
        // console.log('fire')
        console.log(event.target);
        // onOpen(event);
        if(!event.target.className.includes('avatar')) {
            setTID(tid);
            onOpen(event);
            // console.log(tid);
        } else {
            console.log(event.target.className);
        }
    }

    return (
        <div id='listView' className='view'>
            <h2 className='list-title'>Tasks</h2>
            <div className='taskList'>
                {tasks?.map((task, index) => (
                    <TaskCard
                        key={task._id}
                        task={task}
                        projectTitle={title}
                        mode={0}
                        handleEvent={handleEvent}
                    />
                ))}
            </div>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <TaskDetail tid={tid}/>
            </Modal>
        </div>
    );
}