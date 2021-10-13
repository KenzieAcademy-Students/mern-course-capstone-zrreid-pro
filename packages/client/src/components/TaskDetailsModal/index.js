import React, { useState, useRef } from 'react';
import Select from 'react-select';
import UserCard from '../UserCard';
import './TaskDetailsModal.scss';

export default function TaskDetailsModal({
    toggleModal,
    component = 0,
    task = {},
    projectTitle,
    projectCategories,
    projectUsers,
    taskUpdate,
    statusUpdate,
    toggleAssignTask,
    toggleSubtask,
    getStatusColor
}) {
    const modalRef = useRef();
    const objectiveRef = useRef();
    const notesRef = useRef();
    

    const [ editingObjective, setEditingObjective ] = useState(false);
    const [ editingNotes, setEditingNotes ] = useState(false);

    const closeModal = (event) => {
        if(modalRef.current === event.target) {
            toggleModal(0);
        }
    }

    const updateStatus = (operation) => {
        let nextStatus;
        if(operation) {
            nextStatus = projectCategories.indexOf(task?.status) + 1;
            if(nextStatus === projectCategories.length) {
                return;
            } else {
                statusUpdate(projectCategories[nextStatus]);
            }
        } else {
            nextStatus = projectCategories.indexOf(task?.status) - 1;
            if(nextStatus < 0) {
                return;
            } else {
                statusUpdate(projectCategories[nextStatus]);
            }
        }
    }

    const eventHandler = (event) => {
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

    const assignUser = (event) => {
        toggleAssignTask(task._id, event.value, 0);
    }

    //attach to assignment spot, 0 is to assign and 1 is to unassign
    const handleToggleAssign = (uid, operation) => {
        toggleAssignTask(task._id, uid, operation);
    }

    return (
        <div className='modal-overlay' ref={modalRef} onClick={closeModal}>
            <div className='modal-wrapper task-details' onClick={eventHandler}>
                <div className='modal-header'>
                    <h2 className='modal-header-title'>{projectTitle}</h2>
                    <button className='form-close' onClick={() => toggleModal(0)}><i className='bx bx-x'></i></button>
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
                        </div>

                        <div className='user-content'>
                            <div className='modal-subsection'>
                                <h2 className='modal-subtitle'>Assigned User</h2>
                                {
                                    task?.assigned_user ? (
                                        <UserCard user={task?.assigned_user} mode={1} unassign={handleToggleAssign} />
                                    ) : (
                                        <Select
                                            options={projectUsers?.map((user) => ({ value: user?._id, label: user?.username}))}
                                            onChange={assignUser}
                                            placeholder='Assign User to the Task'
                                            noOptionsMessage={() => 'No users to aassign...'}
                                            isSearchable
                                            closeMenuOnSelect={true}
                                        />
                                    )
                                }
                                
                            </div>
                        </div>
                    </div>
                
                </div>
            </div>
        </div>
    );
}