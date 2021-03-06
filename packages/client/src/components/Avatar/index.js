import React from 'react';
import Tippy from '@tippyjs/react';
import './Avatar.scss';

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
                    <Tippy content='logout'>
                        <div className='avatar' style={{'background': user?.avatar?.color}} onClick={signout && signout}>
                            <div className='avatar-content'>{user?.username[0]}</div>
                        </div>
                    </Tippy>
                )
            }    
        </>
    );
}