import React, { useEffect } from 'react';
// import { Avatar, Tooltip, IconButton } from '@chakra-ui/react';
import Avatar from '../Avatar';
import './TaskCard.scss';

export default function TaskCard({
    task: { _id, objective, assigned_user, status },
    // task,
    projectTitle = '',
    mode,
    handleEvent,
    statusColor
}) {

    // useEffect(() => {
    //     console.log('Inner Task:', task);
    // }, []);

    return (
        <div className='taskCard' onClick={(event) => handleEvent(event, _id)} style={{'borderColor': statusColor}}>
            <div className='card-content'>
                <div className='projectName'>{projectTitle}</div>
                <div className='objective'>{objective}</div>
            </div>
            {
                assigned_user ? (<Avatar user={assigned_user} />) :
                    (<div className='addButton'><i className='bx bxs-user-plus'></i></div>)
            }
        </div>
    );

    // return (
    //     <div className='taskCard' onClick={(event) => handleEvent(event, _id)}>
    //         <div className='card-content'>
    //             <div className='projectName'>{projectTitle}</div>
    //             <div className='objective'>{objective}</div>
    //         </div>
    //         {
    //             assigned_user ? (
    //                 <Tooltip label={assigned_user.username} placement='auto'>
    //                     <Avatar size='sm' name={assigned_user.username} />
    //                 </Tooltip>) :
    //                 (<div className='addButton'><i className='bx bxs-user-plus'></i></div>)
    //         }
    //     </div>
    // );

    // return (
    //     <div className='taskCard' onClick={(event) => handleEvent(event, _id)}>
    //         <div className='card-content'>
    //             <div className='projectName'>{projectTitle}</div>
    //             <div className='objective'>{objective}</div>
    //         </div>
    //         {
    //             assigned_user ? (
    //                 <Tooltip label={username} placement='auto'>
    //                     <Avatar size='sm' name={username} />
    //                 </Tooltip>) :
    //                 (<IconButton className='addButton' icon={<i className='bx bxs-user-plus'></i>} />)
    //         }
    //     </div>
    // );
}