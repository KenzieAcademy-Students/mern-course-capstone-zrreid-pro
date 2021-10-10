import React from 'react';
import Tippy from '@tippyjs/react';
import './Avatar.scss';
// import { Tooltip, Avatar } from '@chakra-ui/react';

// function ToolTipButton() {
//     return (<div>Unassign User</div>);
// }

export default function Avatar({ user, signout = null }) {
    return (
        <>
            { !signout ?
                (
                    <Tippy content={user?.username}>
                        <div className='avatar ignore' style={{'background': user?.avatar?.color}} onClick={signout && signout}>
                            <div className='avatar-content'>{user?.username[0]}</div>
                        </div>
                    </Tippy>
                ) :
                (
                    <div className='avatar' style={{'background': user?.avatar?.color}} onClick={signout && signout}>
                        <div className='avatar-content'>{user?.username[0]}</div>
                    </div>
                )
            }    
        </>
    );
}