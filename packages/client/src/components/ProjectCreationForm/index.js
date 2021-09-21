import React, { useState } from 'react';
import './ProjectCreationForm.scss';

export default function ProjectCreationForm(props) {
    const emptyProjectForm = {
        projectName: '',
        description: '',
        usersToAdd: [], //the users to add will be a dropdown menu
        usersAdded: [], //the users added will be an array of usernames
    }

    const [data, setData] = useState(emptyProjectForm)
    
    const handleInputChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        }

        )
    }

    const handleSubmit = (event) => {
        console.log(data)
        event.preventDefault()
        
    }

    return (

        <div className="ProjectCreationForm">
            <h1>New Project</h1>
            <input
                name='projectName' 
                placeholder="Project Name"
                value={data.projectName}
                onChange={handleInputChange}
            ></input>
            <input
                name='description'
                placeholder="Description"
                id="largeTextBox"
                value={data.description}
                onChange={handleInputChange}
            ></input>
            <label
                for='usersToAdd'
            >Select users to add</label>
            <select
                name='usersToAdd'
                id='usersToAdd'
                placeholder="Users to Add"
            >
                {data.usersToAdd.map((user) => { //creates an option for each user on the project
                    return(
                        <option value={user}>{user}</option>
                    )
                })}
            </select>
            <div 
                id='addedUsers'
            >
                Added users
                {data.usersAdded.map((user) => { //creates a container to put cards for all users
                    return(
                        <div
                            className='userOnProject'
                        >{user}</div>
                    )
                })}
            </div>
            <button
                onClick={handleSubmit}
            >Create</button>
        </div>
    );
}