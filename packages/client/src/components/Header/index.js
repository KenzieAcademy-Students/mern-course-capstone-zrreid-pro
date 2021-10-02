import React from 'react';
import Avatar from '../Avatar';
import './Header.scss';

export default function Header({
    user,
    projectTitle,
    pageView
}) {
    return (
        <div className='header'>
            <div className='dashboard-identifier'>
                {pageView ? user.username : projectTitle}
            </div>
            <Avatar user={user} />
        </div>
    );
}