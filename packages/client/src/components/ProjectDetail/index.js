import React, { useState, useEffect } from 'react';
import Select from 'react-select';
// import { Modal, useDisclosure } from '@chakra-ui/react';
// import axios from '../../../utils/axiosConfig';
import TaskCard from '../TaskCard';
// import TaskDetail from '../TaskDetail';
// import Modal from '../TaskDetailsModal';
// import { TaskCard } from '../../Display';
import './ProjectDetail.scss';

function UserCard({ user }) {
    return (
        <div className='userCard' style={{'borderColor': user?.avatar?.color}}>{user?.username}</div>
    );
}

export default function ProjectDetail({
    // project: { title, description, tasks, users },
    project,
    openTaskDetails,
    totalUsers,
    projectUpdate
    // handleEvent
}) {
    const [ tid, setTID ] = useState();
    const [ editingDescription, setEditingDescription ] = useState(false);
    const [ projectDescription, setProjectDescription ] = useState();

    // const temporaryFix = (uid) => {
    //     for(let i = 0; i < users.length; i++) {
    //         if(users[i]._id === uid) {
    //             return users[i].username;
    //         }
    //     }
    // }

    // const fetchTask = async (tid) => {
    //     try {
    //         const response = await axios.get(`task/${tid}`);
            
    //     } catch (error) {
    //         console.log('Fetch Task Error');
    //     }
    // }

    // const handleToggleModal = () => {
    //     setDetailsOpen(!detailsOpen);
    // }

    const toggleDescriptionEdit = () => {
        if(editingDescription) {
            setEditingDescription(false);
            console.log('submit new description')
            //Send the update up the chain
            projectUpdate(projectDescription);
        } else {
            setEditingDescription(true);
        }
    }

    


    const handleEvent = (event, tid) => {
        // console.log('fire')
        // onOpen(event);
        if(!event.target.className.includes('avatar')) {
            // console.log(tid)
            openTaskDetails(1, tid);
            // setTID(tid);
            // handleToggleModal();
            // onOpen(event);
            // console.log(tid);
        } else {
            console.log(event.target.className);
        }
    }

    useEffect(() => {
        if(project?.description) {
            setProjectDescription(project.description);
        }
    }, [project]);

    // Add a list of users who are working on the project next to the description on its right side

    return (
        <div id='projectDetail' className='view'>
            <div className='topSection'>
                <div className='project-description'>
                    {
                        editingDescription ? (
                            <>
                                <textarea
                                    className='description-editor'
                                    name='description'
                                    value={projectDescription}
                                    onChange={(event) => setProjectDescription(event.target.value)}
                                />

                                <button onClick={toggleDescriptionEdit}>Submit Changes</button>
                            </>
                        ) : (
                            <div className='inner-description' onClick={toggleDescriptionEdit}>{project?.description}</div>
                        )
                    }
                </div>
                
                {/* <div className='project-description'>{description}</div> */}
                <div className='user-section'>
                    <h3 className='list-title'>Project Users</h3>
                    <div className='usersList'>
                        {
                            project && project.users?.map((user, index) => <UserCard key={index} user={user} />)
                        }
                    </div>
                    {/* <Select
                        options={totalUsers?.reduce((users, user) => [...users, { value: user._id, label: user.username }], [])}
                        placeholder='Add Users to Project'
                        noOptionsMessage={() => 'No other users to add...'}
                        isSearchable
                        isMulti
                        closeMenuOnSelect={false}
                    /> */}
                </div>
                
            </div>
            

            <div className='taskAssignment'>
                <div className='unassigned'>
                    <h2 className='list-title'>Unassigned</h2>
                    <div className='taskList'>
                        {project?.tasks?.reduce((list, task) => {
                            if(!task.assigned_user) {
                                return [...list,
                                    <TaskCard
                                        key={task._id}
                                        task={task}
                                        projectTitle={project?.title}
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
                        {project?.tasks?.reduce((list, task) => {
                            if(task.assigned_user) {
                                return [...list,
                                    <TaskCard
                                        key={task._id}
                                        task={task}
                                        projectTitle={project?.title}
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

            {/* <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <TaskDetail tid={tid} projectTitle={title} />
            </Modal> */}
            {/* { detailsOpen && <Modal toggleModal={handleToggleModal} /> } */}
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