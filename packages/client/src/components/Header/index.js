import React from 'react';
import './Header.scss';

export default function Header({
    user: { username, avatar },
    projectTitle,
    pageView
}) {
    return (
        <div className='header'>
            <div className='dashboard-identifier'></div>
            <div className='header-avatar'>[User Avatar]</div>
        </div>
    );
}