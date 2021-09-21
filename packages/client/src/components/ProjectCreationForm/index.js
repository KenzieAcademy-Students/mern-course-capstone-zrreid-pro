import React, { useState } from 'react';
import './ProjectCreationForm.scss';

export default function ProjectCreationForm() {
    const emptyProjectForm = {
        projectName: '',
        description: '',
        usersToAdd: [],
        usersAdded: [],
    }

    const [data, setData] = useState(emptyProjectForm)
    
    const handleInputChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        }

        )
    }

    return (

        <div className="ProjectCreationForm">
            <h1>New Project</h1>
            <input
                name='projectName' 
                placeholder="Project Name"
                value={data.projectName}
                onChange={handleInputChange}
            >Project Name</input>
            <input
                name='description'
                placeholder="Description"
                value={data.description}
                onChange={handleInputChange}
            >Description</input>
            <select
                name='usersToAdd'
                placeholder="Users to Add"
            >User to Add</select>
        </div>
    );
}