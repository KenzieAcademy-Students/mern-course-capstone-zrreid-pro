import React, { useEffect } from 'react';
import { Avatar, Tooltip, IconButton } from '@chakra-ui/react';
import './TaskCard.scss';

export default function TaskCard({
    task: { _id, objective, assigned_user, status },
    // task,
    projectTitle = '',
    username = '',
    mode,
    handleEvent
}) {

    // useEffect(() => {
    //     console.log('Inner Task:', task);
    // }, []);

    return (
        <div className='taskCard' onClick={(event) => handleEvent(event, _id)}>
            <div className='card-content'>
                <div className='projectName'>{projectTitle}</div>
                <div className='objective'>{objective}</div>
            </div>
            {
                assigned_user ? (
                    <Tooltip label={username} placement='auto'>
                        <Avatar size='sm' name={username} />
                    </Tooltip>) :
                    (<div className='addButton'><i className='bx bxs-user-plus'></i></div>)
            }
        </div>
    );

    return (
        <div className='taskCard' onClick={(event) => handleEvent(event, _id)}>
            <div className='card-content'>
                <div className='projectName'>{projectTitle}</div>
                <div className='objective'>{objective}</div>
            </div>
            {
                assigned_user ? (
                    <Tooltip label={username} placement='auto'>
                        <Avatar size='sm' name={username} />
                    </Tooltip>) :
                    (<IconButton className='addButton' icon={<i className='bx bxs-user-plus'></i>} />)
            }
        </div>
    );
}