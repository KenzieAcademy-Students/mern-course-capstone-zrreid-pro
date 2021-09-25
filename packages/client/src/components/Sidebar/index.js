import React from 'react';
import './Sidebar.scss';

export default function Sidebar({
    projectList,
    loadProject,
    navigate
}) {
    return (
        <div className='sidebar'>
            <div className='sidebar-header'>
                <div className='monogram'>[Logo]</div>
            </div>
            <div className='sidebar-content'>
                <div className='pageNav'>
                    <div className='nav-item' onClick={() => navigate(1)}>User Profile</div>
                </div>
                <div className='projectList'>
                    {projectList.map((project, index) => (
                        <div key={index} onClick={() => loadProject(project._id)} className='projectButton'>{project.title}</div>
                    ))}

                    <button className='projectCreateButton'>+ New Project</button>
                </div>
            </div>
        </div>
    );
}