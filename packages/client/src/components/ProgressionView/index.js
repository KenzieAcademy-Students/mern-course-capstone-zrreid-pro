import React, { useState, useEffect }  from 'react';
import { Modal, useDisclosure } from '@chakra-ui/react';
import TaskCard from '../TaskCard';
import TaskDetail from '../TaskDetail';
import './ProgressionView.scss';

export default function ProgressionView({
    project: { title, status_categories, tasks, users }
    // project
}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ tasks2, setTasks ] = useState((tasks || []));
    const [ sortedTasks, setSortedTasks ] = useState(tasks2.reduce((obj, task) => (
        {...obj, [task.status]: [...(obj[task.status] || []), task]}
    ), {}));
    const [ block, setBlock ] = useState(true);
    // const { status_categories, tasks, users } = project;
    const [ tid, setTID ] = useState();
    


    const temporaryFix = (uid) => {
        for(let i = 0; i < users.length; i++) {
            if(users[i]._id === uid) {
                return users[i].username;
            }
        }
    }

    const handleEvent = (event, tid) => {
        // console.log('fire')
        console.log(event.target);
        // onOpen(event);
        if(!event.target.className.includes('avatar')) {
            setTID(tid);
            onOpen(event);
            // console.log(tid);
        } else {
            console.log(event.target.className);
        }
    }

    // useEffect(() => {
    //     console.log('outside reduce block');
    //     if(!block) {
    //         console.log('inside reduce block');
    //         let t = tasks.reduce((obj, task) => (
    //             {...obj, [task.status]: [...(obj[task.status] || []), task]}
    //         ), {});
    //         setSortedTasks(t);
    //     }
    // }, [block]);

    useEffect(() => {
        // setStatusCategories(['Not Started', ...categories, 'Completed']);
        // console.log('Proj:', project);
        // console.log()
        // setTimeout(() => {
        //     let t = tasks.reduce((obj, task) => (
        //         {...obj, [task.status]: [...(obj[task.status] || []), task]}
        //     ), {});
        //     setSortedTasks(t);
        // }, 1000);
        let t = tasks2.reduce((obj, task) => (
            {...obj, [task.status]: [...(obj[task.status] || []), task]}
        ), {});
        // console.log('This:', t);
        setSortedTasks(t);
        setBlock(false);
        // console.log('removing block');

        // setSortedTasks(project.tasks.reduce((obj, task) => (
        //     {...obj, [task.status]: [...(obj[task.status] || []), task]}
        // ), {}));

    }, []);

    // return (
    //     <div id='progressionView' className='view'>
    //         <div id='baseline' className='statusList'>
    //             {
    //                 sortedTasks['Not Started']?.map((task) => (
    //                     <TaskCard
    //                         key={task._id}
    //                         tasks={task}
    //                         username={temporaryFix(task.users[0])}
    //                         mode={0}
    //                         handleEvent={handleEvent}
    //                     />
    //                 ))
    //             }
    //         </div>
    //         {/* {
    //             categories?.map((status, index) => (
    //                 <div className='statusList' key={index}>
    //                     {
    //                         sortedTasks[status].map((task) => (
    //                             <TaskCard
    //                                 key={task._id}
    //                                 tasks={task}
    //                                 username={temporaryFix(task.users[0])}
    //                                 mode={0}
    //                                 handleEvent={handleEvent}
    //                             />
    //                         ))
    //                     }
    //                 </div>
    //             ))
    //         } */}
    //         <div id='completed' className='statusList'>
    //             {/* {
    //                 sortedTasks['Completed']?.map((task) => (
    //                     <TaskCard
    //                         key={task._id}
    //                         tasks={task}
    //                         username={temporaryFix(task.users[0])}
    //                         mode={0}
    //                         handleEvent={handleEvent}
    //                     />
    //                 ))
    //             } */}
    //         </div>

    //         <Modal isOpen={isOpen} onClose={onClose} isCentered>
    //             <TaskDetail tid={tid}/>
    //         </Modal>
    //     </div>
    // );

    return (
        <div id='progressionView' className='view'>
            {
                block ? (<></>) : (status_categories?.map((status, index) => (
                    <div className='wrapper' key={index}>
                        <h2 className='list-title'>{status}</h2>
                        <div className='statusList'>
                            {
                                sortedTasks[status]?.map((task) => (
                                    <TaskCard
                                        key={task._id}
                                        task={task}
                                        projectTitle={title}
                                        // projectTitle={project.title}
                                        username={temporaryFix(task.assigned_user)}
                                        mode={0}
                                        handleEvent={handleEvent}
                                    />
                                ))
                            }
                        </div>
                    </div>
                )))
            }

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <TaskDetail tid={tid}/>
            </Modal>
        </div>
    );

    // return (
    //     <div id='progressionView' className='view'>
    //         <div id='baseline' className='statusList'>
    //             <h2 className='list-title'>Not Started</h2>
    //             {
    //                 sortedTasks['Not Started']?.map((task) => {
    //                     // console.log('Task:', task);
    //                     return (
    //                     <TaskCard
    //                         key={task._id}
    //                         task={task}
    //                         projectTitle={title}
    //                         // projectTitle={project.title}
    //                         username={temporaryFix(task.assigned_user)}
    //                         mode={0}
    //                         handleEvent={handleEvent}
    //                     />
    //                 )})
    //             }
    //         </div>
    //         {
    //             (status_categories?.map((status, index) => (
    //                 <div className='wrapper' key={index}>
    //                     <h2 className='list-title'>{status}</h2>
    //                     <div className='statusList'>
    //                         {
    //                             sortedTasks[status].map((task) => (
    //                                 <TaskCard
    //                                     key={task._id}
    //                                     task={task}
    //                                     projectTitle={title}
    //                                     // projectTitle={project.title}
    //                                     username={temporaryFix(task.assigned_user)}
    //                                     mode={0}
    //                                     handleEvent={handleEvent}
    //                                 />
    //                             ))
    //                         }
    //                     </div>
    //                 </div>
    //             )))
    //         }
    //         <div id='completed' className='statusList'>
    //             <h2 className='list-title'>Completed</h2>
    //             {
    //                 sortedTasks['Completed']?.map((task) => (
    //                     <TaskCard
    //                         key={task._id}
    //                         task={task}
    //                         projectTitle={title}
    //                         // projectTitle={project.title}
    //                         username={temporaryFix(task.assigned_user)}
    //                         mode={0}
    //                         handleEvent={handleEvent}
    //                     />
    //                 ))
    //             }
    //         </div>
    //         {/* <div id='completed2' className='statusList'>
    //             <h2 className='list-title'>Completed</h2>
    //             {
    //                 sortedTasks['Completed']?.map((task) => (
    //                     <TaskCard
    //                         key={task._id}
    //                         task={task}
    //                         username={temporaryFix(task.assigned_user)}
    //                         mode={0}
    //                         handleEvent={handleEvent}
    //                     />
    //                 ))
    //             }
    //         </div> */}

    //         <Modal isOpen={isOpen} onClose={onClose} isCentered>
    //             <TaskDetail tid={tid}/>
    //         </Modal>
    //     </div>
    // );
}