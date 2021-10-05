import React, { useState, useEffect, useRef } from 'react';
// import TaskDetail from '../TaskDetail';
import TaskCard from '../TaskCard';
// import axios from '../../../utils/axiosConfig';
import './TaskDetailsModal.scss';

export default function TaskDetailsModal({
    toggleModal,
    component = 0,
    task = {},
    projectTitle
}) {
    const modalRef = useRef();

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

    return (
        <div className='modal-overlay' ref={modalRef} onClick={closeModal}>
            <div className='modal-wrapper task-details'>
                {/* <TaskDetail tid={tid} projectTitle={projectTitle} toggleModal={toggleModal} /> */}
                <div className='modal-header'>
                    <h2 className='modal-header-title'>{projectTitle}</h2>
                    <button onClick={() => toggleModal(0)}>X</button>
                </div>

                <div className='modal-body'>
                    <div className='modal-body-header'>
                        <h1 className='modal-body-title'>{task?.objective}</h1>
                        <div>Deadline</div>
                        <div>{task?.status}</div>
                    </div>

                    <div className='modal-body-content'>
                        <div className='task-content'>
                            <div className='task-notes'>{task?.notes}</div>
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
                                <div>{task?.assigned_user?.username}</div>
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