import React from 'react';
import './Avatar.scss';
// import { Tooltip, Avatar } from '@chakra-ui/react';

export default function Avatar({ user, signout = null }) {
    return (
        <div className='avatar' style={{'background': user?.avatar?.color}} onClick={signout && signout}>
            <div className='avatar-content'>{user?.username[0]}</div>
        </div>
    );
}