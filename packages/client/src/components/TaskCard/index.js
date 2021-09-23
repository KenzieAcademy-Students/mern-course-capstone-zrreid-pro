import React from 'react';
import { Tooltip, Avatar, AvatarGroup, IconButton } from '@chakra-ui/react';
// import Avatar from '../Avatar';
import './TaskCard.scss';

export default function TaskCard({
    task: { objective, users, status },
    project,
    mode
}) {
    return (
        <div className='taskCard'>
            <span className='title'>
                {!mode ? objective : project}
            </span>
            <AvatarGroup size='sm' max={3} className='avatars'>
                {
                    users.length > 0 ? 
                        users.map((user,index) => (
                            <Avatar key={index} size='sm' name={user} />
                        )) : 
                        <IconButton className='addButton' icon={<i className='bx bxs-user-plus'></i>} />
                }
            </AvatarGroup>
            <span className='status'>{status}</span>
        </div>
    );
}