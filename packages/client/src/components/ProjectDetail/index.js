import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import TaskCard from '../TaskCard';
import Avatar from '../Avatar';
import './ProjectDetail.scss';

export default function ProjectDetail({
    project,
    openTaskDetails,
    totalUsers,
    projectDescriptionUpdate,
    projectUsersUpdate,
    assignTask,
    getStatusColor
}) {
    const [ editingDescription, setEditingDescription ] = useState(false);
    const [ descriptionUpdated, setDescriptionUpdated ] = useState(false);
    const [ projectDescription, setProjectDescription ] = useState();

    const [ updatingUsers, setUpdatingUsers ] = useState(false);
    const [ userSelection, setUserSelection ] = useState([]);

    const toggleDescriptionEdit = () => {
        if(editingDescription) {
            setEditingDescription(false);
            if(descriptionUpdated) {
                projectDescriptionUpdate(projectDescription);
                setDescriptionUpdated(false);
            }
        } else {
            setEditingDescription(true);
        }
    }

    const submitNewUserList = () => {
        if(userSelection.length > 0) {
            projectUsersUpdate(userSelection);
            setUserSelection([]);
        }

        setUpdatingUsers(false);    
    }

    const handleEvent = (event, tid) => {
        if(!event.target.className.includes('ignore') && !event.target.className.includes('tippy-content')) {
            openTaskDetails(1, tid);
        }
    }

    useEffect(() => {
        if(project?.description) {
            setProjectDescription(project.description);
        }
    }, [project]);

    useEffect(() => {
        if(editingDescription) {
            setDescriptionUpdated(true);
        }
    }, [projectDescription]);

    return (
        <div id='projectDetail' className='view'>
            <div className='topSection'>
                <div className='project-description'>
                    {
                        editingDescription ? (
                            <textarea
                                className='description-editor'
                                name='description'
                                value={projectDescription}
                                onChange={(event) => setProjectDescription(event.target.value)}
                                autoFocus
                                onBlur={toggleDescriptionEdit}
                            />
                        ) : (
                            <div className='inner-description' onClick={toggleDescriptionEdit}>{project?.description}</div>
                        )
                    }
                </div>
                
                <div className='user-section'>
                    <h3 className='list-title'>Project Users</h3>
                    <div className='usersList'>
                        {
                            project && project.users?.map((user, index) => <Avatar key={index} user={user} />)
                        }
                    </div>
                    {
                        updatingUsers &&
                        <Select
                            options={totalUsers?.reduce((users, user) => {
                                if(!project?.users?.some((item) => item._id === user._id)) {
                                    return [...users, { value: user._id, label: user.username }];
                                } else {
                                    return users;
                                }
                            }, [])}
                            onChange={setUserSelection}
                            placeholder='Add Users to Project'
                            noOptionsMessage={() => 'No other users to add...'}
                            isSearchable
                            isMulti
                            closeMenuOnSelect={false}
                            onBlur={submitNewUserList}
                        />
                    }

                    { !updatingUsers && <button className='user-add-button' onClick={() => setUpdatingUsers(true)}>+ Add Users to Project</button> }
                    
                </div>
                
            </div>
            

            <div className='taskAssignment'>
                <div className='unassigned'>
                    <h2 className='list-title'>Unassigned</h2>
                    <div className='taskList'>
                        {project?.tasks?.reduce((list, task) => {
                            if(!task.assigned_user) {
                                return [...list,
                                    <TaskCard
                                        key={task._id}
                                        task={task}
                                        projectTitle={project?.title}
                                        projectUsers={project?.users}
                                        mode={0}
                                        handleEvent={handleEvent}
                                        assignTask={assignTask}
                                        statusColor={getStatusColor(task.status)}
                                    />];
                            } else {
                                return list;
                            }
                        }, [])}
                    </div>
                </div>
                <div className='assigned'>
                    <h2 className='list-title'>Assigned</h2>
                    <div className='taskList'>
                        {project?.tasks?.reduce((list, task) => {
                            if(task.assigned_user) {
                                return [...list,
                                    <TaskCard
                                        key={task._id}
                                        task={task}
                                        projectTitle={project?.title}
                                        mode={0}
                                        handleEvent={handleEvent}
                                        assignTask={assignTask}
                                        statusColor={getStatusColor(task.status)}
                                    />];
                            } else {
                                return list;
                            }
                        }, [])}
                    </div>
                </div>
            </div>
        </div>
    );
}