import React, { useRef } from 'react';

import './TaskCreationModal.scss';

export default function TaskCreationModal({
    data,
    handleInputChange,
    createTask,
    toggleModal
}) {
    const modalRef = useRef();

    const closeModal = (event) => {
        if(modalRef.current === event.target) {
            toggleModal();
        }
    }

    return (
        <div className='modal-overlay' ref={modalRef} onClick={closeModal}>
            <form className='modal-wrapper task-form'>
                <h2 className='task-form-title'>Create a New Task</h2>
                <button className='form-close' onClick={toggleModal}><i className='bx bx-x'></i></button>

                <div className='task-form-body'>
                    <input
                        className='task-form-input'
                        type='text'
                        name='objective'
                        placeholder='Task Objective'
                        value={data.objective}
                        onChange={handleInputChange}
                        autoComplete='off'
                        required
                    />

                    <textarea
                        id='task-form-textarea'
                        className='task-form-input'
                        name='notes'
                        placeholder='Describe your task objective'
                        value={data.notes}
                        onChange={handleInputChange}
                        autoComplete='off'
                    />

                    <button className='submit-button' onClick={createTask}>Create Task</button>
                </div>
            </form>
        </div>
    );
}