import React from 'react';
import { Avatar, AvatarGroup, IconButton } from '@chakra-ui/react';
// import Avatar from '../Avatar';
import './TaskCard.scss';

export default function TaskCard({
    task: { objective, users, status },
    projectTitle = '',
    username = '',
    mode
}) {
    return (
        <div className='taskCard'>
            <span className='title'>
                {!mode ? objective : projectTitle}
            </span>
            <AvatarGroup size='sm' max={3} className='avatars'>
                {
                    users.length > 0 ? 
                        users.map((user,index) => (
                            <Avatar key={index} size='sm' name={username} />
                        )) : 
                        <IconButton className='addButton' icon={<i className='bx bxs-user-plus'></i>} />
                }
            </AvatarGroup>
            <span className='status'>{status}</span>
        </div>
    );
}