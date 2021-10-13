import React, { useState, useEffect } from 'react';
import ProjectDetail from '../ProjectDetail';
import ListView from '../ListView';
import ProgressionView from '../ProgressionView';
import TimelineView from '../TimelineView';
import './ProjectView.scss';

export default function ProjectView({
    project,
    session,
    openTaskDetails,
    totalUsers,
    projectDescriptionUpdate,
    projectUsersUpdate,
    assignTask,
    getStatusColor
}) {
    const [ activeTab, setActiveTab ] = useState(0);

    const changeView = (view) => {
        setActiveTab(view);
        sessionStorage.setItem('MERNAppDashboard', JSON.stringify({...session, projectView: view}));
    }

    useEffect(() => {
        const savedTab = JSON.parse(sessionStorage.getItem('MERNAppDashboard')) || false;
        if(savedTab) {
            setActiveTab(savedTab.projectView);
        }
    }, []);

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
                {/* <div
                    className={`viewTab ${activeTab === 3 ? `active` : ``}`}
                    onClick={() => changeView(3)}
                >Timeline View</div> */}
            </div>
            
            {
                activeTab === 0 ? (
                    <ProjectDetail
                        project={project}
                        openTaskDetails={openTaskDetails}
                        totalUsers={totalUsers}
                        projectDescriptionUpdate={projectDescriptionUpdate}
                        projectUsersUpdate={projectUsersUpdate}
                        assignTask={assignTask}
                        getStatusColor={getStatusColor}
                    />
                ) : activeTab === 1 ? (
                    <ListView
                        project={project}
                        openTaskDetails={openTaskDetails}
                        assignTask={assignTask}
                        getStatusColor={getStatusColor}
                    />
                ) : activeTab === 2 ? (
                    <ProgressionView
                        project={project}
                        openTaskDetails={openTaskDetails}
                        assignTask={assignTask}
                        getStatusColor={getStatusColor}
                    />
                ) : (
                    <TimelineView />
                )
            }
        </div>
    );
}