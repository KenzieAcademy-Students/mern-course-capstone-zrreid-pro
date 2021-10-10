import React, { useState, useEffect } from 'react';
import Tippy from '@tippyjs/react';
import Avatar from '../Avatar';
import './TaskCard.scss';

function ToolTipMenu({ projectUsers, assign }) {
    return (
        <div className='tooltip-menu ignore'>
            {
                projectUsers?.map((user, index) => <div className='tooltip-menu-item ignore' key={index} onClick={() => assign(user._id)}>{user?.username}</div>)
            }
        </div>
    );
}

export default function TaskCard({
    task: { _id, objective, assigned_user, status },
    // task,
    projectTitle = '',
    projectUsers,
    mode,
    handleEvent,
    assignTask,
    statusColor
}) {

    // useEffect(() => {
    //     console.log('Inner Task:', projectUsers);
    // }, []);
    // const [ assigningUser, setAssigningUser ] = useState(false);

    const handleAssign = (uid) => {
        assignTask(_id, uid, 0);
    }

    return (
        <div className='taskCard' onClick={(event) => handleEvent(event, _id)} style={{'borderColor': statusColor}}>
            <div className='card-content'>
                <div className='projectName'>{projectTitle}</div>
                <div className='objective'>{objective}</div>
            </div>
            { assigned_user && <Avatar user={assigned_user} /> }
            
            { !assigned_user &&
                <Tippy interactive={true} content={<ToolTipMenu projectUsers={projectUsers} assign={handleAssign} />}>
                    <div className='assignButton ignore'><i className='bx bxs-user-plus ignore'></i></div>
                </Tippy>
            }
            {/* {
                assigned_user ? (<Avatar user={assigned_user} />) :
                    (<div className='addButton'><i className='bx bxs-user-plus'></i></div>)
            } */}
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