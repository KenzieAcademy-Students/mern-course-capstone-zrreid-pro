import React from 'react';
import './Avatar.scss';
// import { Tooltip, Avatar } from '@chakra-ui/react';

export default function Avatar({ user }) {
    return (
        <div className='avatar'>
            <div className='avatar-content'>{user.username[0]}</div>
        </div>
    );
}