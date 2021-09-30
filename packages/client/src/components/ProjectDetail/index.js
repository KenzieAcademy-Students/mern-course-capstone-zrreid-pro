import React, { useState } from 'react';
import { Modal, useDisclosure } from '@chakra-ui/react';
import axios from '../../utils/axiosConfig';
import TaskCard from '../TaskCard';
import TaskDetail from '../TaskDetail';
import './ProjectDetail.scss';

export default function ProjectDetail({
    project: { title, description, tasks, users },
    // handleEvent
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

    const fetchTask = async (tid) => {
        try {
            const response = await axios.get(`task/${tid}`);
            
        } catch (error) {
            console.log('Fetch Task Error');
        }
    }

    const handleEvent = (event, tid) => {
        // console.log('fire')
        // onOpen(event);
        if(!event.target.className.includes('avatar')) {
            
            setTID(tid);
            onOpen(event);
            // console.log(tid);
        } else {
            console.log(event.target.className);
        }
    }

    // Add a list of users who are working on the project next to the description on its right side

    return (
        <div id='projectDetail' className='view'>
            <p className='project-description'>{description}</p>

            <div className='taskAssignment'>
                <div className='unassigned'>
                    <h2 className='list-title'>Unassigned</h2>
                    <div className='taskList'>
                        {tasks?.reduce((list, task) => {
                            if(!task.assigned_user) {
                                return [...list,
                                    <TaskCard
                                        key={task._id}
                                        task={task}
                                        projectTitle={title}
                                        mode={0}
                                        handleEvent={handleEvent}
                                    />];
                            } else {
                                return list;
                            }
                        }, [])}
                    </div>
                </div>
                <div className='assigned'>
                    <h2 className='list-title'>Assigned</h2>
                    <div className='taskList'>
                        {tasks?.reduce((list, task) => {
                            if(task.assigned_user) {
                                return [...list,
                                    <TaskCard
                                        key={task._id}
                                        task={task}
                                        username={temporaryFix(task.assigned_user)}
                                        projectTitle={title}
                                        mode={0}
                                        handleEvent={handleEvent}
                                    />];
                            } else {
                                return list;
                            }
                        }, [])}
                    </div>
                </div>
            </div>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <TaskDetail tid={tid}/>
            </Modal>
        </div>
    );

    // return (
    //     <div id='projectDetail' className='view'>
    //         <p className='project-description'>{description}</p>

    //         <div className='taskAssignment'>
    //             <div className='unassigned'>
    //                 <h2 className='list-title'>Unassigned</h2>
    //                 <div className='taskList'>
    //                     {tasks?.map((task, index) => (
    //                         task.users.length === 0 ? (
    //                             <TaskCard
    //                                 key={task._id}
    //                                 task={task}
    //                                 mode={0}
    //                                 handleEvent={handleEvent}
    //                             />) : <></>))}
    //                 </div>
    //             </div>
    //             <div className='assigned'>
    //                 <h2 className='list-title'>Assigned</h2>
    //                 <div className='taskList'>
    //                     {tasks?.map((task, index) => (
    //                         task.users.length > 0 ? (
    //                             <TaskCard
    //                                 key={index}
    //                                 task={task}
    //                                 username={temporaryFix(task.users[0])}
    //                                 mode={0}
    //                                 handleEvent={handleEvent}
    //                             />) : <></>))}
    //                 </div>
    //             </div>
    //         </div>

    //         <Modal isOpen={isOpen} onClose={onClose} isCentered>
    //             <TaskDetail tid={tid}/>
    //         </Modal>
    //     </div>
    // );
}