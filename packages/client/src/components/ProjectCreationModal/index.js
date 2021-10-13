import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
// import makeAnimated from 'react-select/animated';
import './ProjectCreationModal.scss';

export default function ProjectCreationModal({
    data,
    totalUsers = [],
    currentUser,
    handleInputChange,
    updateUserList,
    createProject,
    toggleModal,
}) {
    const modalRef = useRef();
    const [ selection, setSelection ] = useState([]);

    const closeModal = (event) => {
        if(modalRef.current === event.target) {
            toggleModal();
        }
    }

    useEffect(() => {
        updateUserList(selection.map((selected) => selected.value));
    }, [selection])

    return (
        <div className='modal-overlay' ref={modalRef} onClick={closeModal}>
            <form className='modal-wrapper pc-form'>
                <h2 className='pc-form-title'>Create a New Project</h2>
                <button className='form-close' onClick={toggleModal}><i className='bx bx-x'></i></button>

                <div className='pc-form-body'>
                    <input
                        className='pc-form-input'
                        type='text'
                        name='title'
                        placeholder='Project Name'
                        value={data.title}
                        onChange={handleInputChange}
                        autoComplete='off'
                        autoFocus
                        required
                    />

                    <textarea
                        id='pc-form-textarea'
                        className='pc-form-input'
                        name='description'
                        placeholder='Describe your project'
                        value={data.description}
                        onChange={handleInputChange}
                        autoComplete='off'
                    />

                    <Select
                        options={totalUsers?.reduce((users, user) => {
                            if(user._id !== currentUser) {
                                return [...users, { value: user._id, label: user.username}];
                            } else {
                                return users;
                            }
                        }, [])}
                        placeholder='Add Users to Project'
                        noOptionsMessage={() => 'No available users...'}
                        onChange={setSelection}
                        isSearchable
                        isMulti
                        closeMenuOnSelect={false}
                    />

                    <button className='submit-button' onClick={createProject}>Create Project</button>
                </div>
            </form>
        </div>
    );
}