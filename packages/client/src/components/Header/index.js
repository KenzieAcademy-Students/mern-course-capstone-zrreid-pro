import React from 'react';
import './Header.scss';

export default function Header({
    user: { username, avatar },
    projectTitle,
    pageView
}) {
    return (
        <div className='header'>
            <div className='dashboard-identifier'>
                {pageView ? username : projectTitle}
            </div>
            <div className='header-avatar'>[User Avatar]</div>
        </div>
    );
}