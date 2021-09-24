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
                <div className='pageNav'></div>

                <div className='projectList'></div>
            </div>
        </div>
    );
}