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
            <h2 className='dashboard-identifier'>
                {pageView ? user.username : projectTitle}
            </h2>
            <Avatar user={user} signout={signout}/>
        </div>
    );
}