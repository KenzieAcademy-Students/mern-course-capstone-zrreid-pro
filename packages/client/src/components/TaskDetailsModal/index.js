import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
// import TaskDetail from '../TaskDetail';
import TaskCard from '../TaskCard';
import UserCard from '../UserCard';
// import axios from '../../../utils/axiosConfig';
import './TaskDetailsModal.scss';

export default function TaskDetailsModal({
    toggleModal,
    component = 0,
    task = {},
    projectTitle,
    projectCategories,
    taskUpdate,
    statusUpdate,
    toggleAssignTask,
    getStatusColor
}) {
    const modalRef = useRef();
    const objectiveRef = useRef();
    const notesRef = useRef();
    

    const [ editingObjective, setEditingObjective ] = useState(false);
    const [ editingStatus, setEditingStatus ] = useState(false);
    const [ editingNotes, setEditingNotes ] = useState(false);
    const [ editingAssignedUser, setEditingAssignedUser ] = useState(false);

    const [ selectedStatus, setSelectedStatus ] = useState();

    // useEffect(() => {
    //     try {
    //         const response = await
    //     } catch (error) {
    //         console.log('Task Fetch Error:', error);
    //     }
    // }, [tid])

    const closeModal = (event) => {
        if(modalRef.current === event.target) {
            toggleModal(0);
        }
    }

    const updateStatus = (operation) => {
        let nextStatus;
        if(operation) {
            nextStatus = projectCategories.indexOf(task?.status) + 1;
            // console.log('task next status1:', nextStatus)
            if(nextStatus === projectCategories.length) {
                return;
            } else {
                statusUpdate(projectCategories[nextStatus]);
            }
        } else {
            nextStatus = projectCategories.indexOf(task?.status) - 1;
            // console.log('task next status0:', nextStatus)
            if(nextStatus < 0) {
                return;
            } else {
                statusUpdate(projectCategories[nextStatus]);
            }
        }
    }

    const eventHandler = (event) => {
        // console.log(`Fire! ${event.target}`)
        if(objectiveRef.current === event.target) {
            setEditingObjective(true);
        } else {
            setEditingObjective(false);
        }

        if(notesRef.current === event.target) {
            setEditingNotes(true);
        } else {
            setEditingNotes(false);
        }
        
    }

    //attach to assignment spot, 0 is to assign and 1 is to unassign
    const handleAssign = (uid, operation) => {
        toggleAssignTask(task._id, uid, operation);
    }

    return (
        <div className='modal-overlay' ref={modalRef} onClick={closeModal}>
            <div className='modal-wrapper task-details' onClick={eventHandler}>
                {/* <TaskDetail tid={tid} projectTitle={projectTitle} toggleModal={toggleModal} /> */}
                <div className='modal-header'>
                    <h2 className='modal-header-title'>{projectTitle}</h2>
                    <button onClick={() => toggleModal(0)}>X</button>
                </div>

                <div className='modal-body'>
                    <div className='modal-body-header'>
                        <div className='modal-body-title'>
                            {
                                editingObjective ? (
                                    <input
                                        className='objective-editor'
                                        name='objective'
                                        value={task?.objective}
                                        onChange={taskUpdate}
                                        autoComplete='off'
                                        ref={objectiveRef}
                                        
                                    />
                                ) : (
                                    <h1 className='inner-objective' ref={objectiveRef}>{task?.objective}</h1>
                                )
                            }
                        </div>
                        
                        
                        {/* <div>Deadline</div> */}
                        
                        <div className='taskmodal-status' style={{'backgroundColor': getStatusColor(task?.status)}}>
                            <i id='status-backward' className='bx bxs-left-arrow' onClick={() => updateStatus(0)}></i>
                            <div className='status-display'>{task?.status}</div>
                            <i id='status-forward' className='bx bxs-right-arrow' onClick={() => updateStatus(1)}></i>
                        </div>
                    </div>

                    <div className='modal-body-content'>
                        <div className='task-content'>
                            <div className='task-notes'>
                                {
                                    editingNotes ? (
                                        <textarea
                                            className='notes-editor'
                                            name='notes'
                                            value={task?.notes}
                                            onChange={taskUpdate}
                                            autoComplete='off'
                                            ref={notesRef}
                                        />
                                    ) : (
                                        <div className='inner-notes' ref={notesRef}>{task?.notes}</div>
                                    )
                                }
                            </div>
                            {/* <div className='task-notes'>{task?.notes}</div> */}
                            <div className='modal-subsection'>
                                <h2 className='modal-subtitle'>Subtasks</h2>
                                <div className='modal-task-list'>
                                    {
                                        task?.subtasks?.map((subtask, index) => (
                                            <TaskCard key={index} task={subtask} handleEvent={toggleModal} />
                                        ))
                                    }
                                    <div className='task-list-add-button'>+ Add New Subtask</div>
                                </div>
                            </div>
                        </div>

                        <div className='user-content'>
                            <div className='modal-subsection'>
                                <h2 className='modal-subtitle'>Assigned User</h2>
                                {/* <div>{task?.assigned_user?.username}</div> */}
                                <UserCard user={task?.assigned_user} />
                            </div>
                            <div className='modal-subsection'>
                                <h2 className='modal-subtitle'>Comments</h2>
                                <div className='modal-comment-list'></div>
                            </div>
                        </div>
                    </div>
                
                </div>
            </div>
        </div>
    );
}