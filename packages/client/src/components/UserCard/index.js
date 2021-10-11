import React, { useState, useEffect } from 'react';
import Tippy from '@tippyjs/react';
import './UserCard.scss';

export default function UserCard({ user, mode, unassign }) {
    return (
        <>
            {
                !mode ? (
                    <div className='userCard' style={{'backgroundColor': user?.avatar?.color, 'borderColor': user?.avatar?.color}}>
                        {user?.username}
                    </div>
                ) : (
                    <div className='userCard' style={{'backgroundColor': user?.avatar?.color, 'borderColor': user?.avatar?.color}}>
                        {/* <Tippy content='Assign Someone Else'>
                            <i className='bx bx-user-plus'></i>
                        </Tippy> */}
                        {user?.username}
                        <Tippy content='Unassign User'>
                            <i className='bx bx-x' onClick={() => unassign(user?._id, 1)}></i>
                        </Tippy>
                    </div>
                )
            }
        </>
    );
}