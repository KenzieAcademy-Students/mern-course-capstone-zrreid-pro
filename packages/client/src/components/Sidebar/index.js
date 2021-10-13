import React from 'react';
import './Sidebar.scss';

export default function Sidebar({
    projectList,
    loadProject,
    navigate,
    toggleProjectCreationModal,
    openTaskCreate
}) {
    return (
        <div className='sidebar'>
            <div className='sidebar-header'>
                <div className='monogram'></div>
            </div>
            <div className='sidebar-content'>
                <div className='pageNav'>
                    <div className='nav-item' onClick={() => navigate(1)}>User Profile</div>
                </div>
                <div className='projectList'>
                    {projectList?.map((project, index) => (
                        <div key={index} onClick={() => loadProject(project._id, index)} className='projectButton'>{project.title}</div>
                    ))}

                    <button className='sidebar-button' onClick={toggleProjectCreationModal}>+ New Project</button>
                    <button className='sidebar-button' onClick={openTaskCreate}>+ New Task</button>
                </div>
            </div>
        </div>
    );
}