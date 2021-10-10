import React, { useState, useEffect } from 'react';
import './UserCard.scss';

export default function UserCard({ user }) {
    return (
        <div className='userCard' style={{'backgroundColor': user?.avatar?.color, 'borderColor': user?.avatar?.color}}>{user?.username}</div>
    );
}