import React from 'react';
import Avatar from '../Avatar';
import './Header.scss';

export default function Header({
    user,
    projectTitle,
    pageView,
    signout
}) {
    return (
        <div className='header'>
            <div className='dashboard-identifier'>
                {pageView ? user.username : projectTitle}
            </div>
            <Avatar user={user} signout={signout}/>
        </div>
    );
}