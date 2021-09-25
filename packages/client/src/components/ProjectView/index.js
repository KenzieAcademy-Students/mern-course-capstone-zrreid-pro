import React, { useState } from 'react';
import TaskCard from '../TaskCard';
import TaskDetail from '../TaskDetail';
import ProjectDetail from '../ProjectDetail';
import ListView from '../ListView';
import ProgressionView from '../ProgressionView';
import TimelineView from '../TimelineView';
import './ProjectView.scss';

export default function ProjectView() {
    const [ activeTab, setActiveTab ] = useState(0);

    return (
        <div id='projectView' className='main-content'>
            <div className='viewTabGroup'>
                <div
                    className={`viewTab ${activeTab === 0 ? `active` : ``}`}
                    onClick={() => setActiveTab(0)}
                >Project Details</div>
                <div
                    className={`viewTab ${activeTab === 1 ? `active` : ``}`}
                    onClick={() => setActiveTab(1)}
                >List View</div>
                <div
                    className={`viewTab ${activeTab === 2 ? `active` : ``}`}
                    onClick={() => setActiveTab(2)}
                >Progression View</div>
                <div
                    className={`viewTab ${activeTab === 3 ? `active` : ``}`}
                    onClick={() => setActiveTab(3)}
                >Timeline View</div>
            </div>
            {
                activeTab === 0 ? (
                    <ProjectDetail />
                ) : activeTab === 1 ? (
                    <ListView />
                ) : activeTab === 2 ? (
                    <ProgressionView />
                ) : (
                    <TimelineView />
                )
            }
        </div>
    );
}