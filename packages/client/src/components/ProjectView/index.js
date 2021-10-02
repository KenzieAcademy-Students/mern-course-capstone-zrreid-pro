import React, { useState, useEffect } from 'react';
import { useProvideProject } from '../../hooks/useProject';
// import TaskCard from '../TaskCard';
// import TaskDetail from '../TaskDetail';
import ProjectDetail from '../ProjectDetail';
import ListView from '../ListView';
import ProgressionView from '../ProgressionView';
import TimelineView from '../TimelineView';
// import { ProjectDetail, ListView, ProgressionView, TimelineView } from '../Views';
import './ProjectView.scss';

export default function ProjectView({
    project,
    session,
    openTaskDetails
}) {
    const [ activeTab, setActiveTab ] = useState(0);
    // const [ project, setProject ] = useState(currentProject);
    // const { project } = useProvideProject();

    // const handleEvent = (event, tid) => {
    //     // console.log('fire');
    //     // console.log(event.target.div);
    //     if(event.target.className.includes('group') || !event.target.className.includes('avatar')) {
    //         openTaskDetails(tid);
    //         // console.log(tid);
            
    //     } else {
    //         console.log(event.target.className);
    //     }
    // }

    const changeView = (view) => {
        setActiveTab(view);
        sessionStorage.setItem('MERNAppDashboard', JSON.stringify({...session, projectView: view}));
    }

    useEffect(() => {
        // console.log('Current Project:', project);
        const savedTab = JSON.parse(sessionStorage.getItem('MERNAppDashboard')) || false;
        if(savedTab) {
            setActiveTab(savedTab.projectView);
        }
        // console.log('PV:', project)
    }, []);

    // useEffect(() => {
    //     console.log('Current Project2:', project);
        
    // }, [project]);

    return (
        <div id='projectView' className='main-content'>
            <div className='viewTabGroup'>
                <div
                    className={`viewTab ${activeTab === 0 ? `active` : ``}`}
                    onClick={() => changeView(0)}
                >Project Details</div>
                <div
                    className={`viewTab ${activeTab === 1 ? `active` : ``}`}
                    onClick={() => changeView(1)}
                >List View</div>
                <div
                    className={`viewTab ${activeTab === 2 ? `active` : ``}`}
                    onClick={() => changeView(2)}
                >Progression View</div>
                <div
                    className={`viewTab ${activeTab === 3 ? `active` : ``}`}
                    onClick={() => changeView(3)}
                >Timeline View</div>
            </div>
            
            {
                activeTab === 0 ? (
                    <ProjectDetail project={project} openTaskDetails={openTaskDetails} />
                ) : activeTab === 1 ? (
                    <ListView project={project} openTaskDetails={openTaskDetails} />
                ) : activeTab === 2 ? (
                    <ProgressionView project={project} openTaskDetails={openTaskDetails} />
                ) : (
                    <TimelineView />
                )
            }
        </div>
    );
}