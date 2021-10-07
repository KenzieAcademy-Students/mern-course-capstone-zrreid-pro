import React, { useState, useEffect, useRef } from 'react';

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
                <button className='task-form-close' onClick={toggleModal}>X</button>
            </form>
        </div>
    );
}