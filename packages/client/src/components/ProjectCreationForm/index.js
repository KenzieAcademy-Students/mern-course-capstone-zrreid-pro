import { 
    Heading, 
    FormControl, 
    FormLabel, 
    Input, 
    Button,
    Select,
    List,
    ListItem, 
} from '@chakra-ui/react';
import React, { useState } from 'react';
import axios from 'axios';
import './ProjectCreationForm.scss';

export default function ProjectCreationForm(props) {
    const emptyProjectForm = { //the initial state of the project creation form
        projectName: '',
        description: '', //not required
        categories: [], 
        usersToAdd: [], //the users to add will be a dropdown menu
        usersAdded: [], //the users added will be an array of usernames
    }

    const [data, setData] = useState(emptyProjectForm) //sets the initial state of the project form
    
    //the functions associated with the component are here until we have a home for them
    const handleInputChange = (event) => { //updates the data of the project form
        setData({
            ...data, //keeps previous data
            [event.target.name]: event.target.value, //adds whan was changed
        }

        )
    }

    const handleSubmit = async (event) => { //submit the project when finished
        console.log(data) //proves the form is complete when submitting
        event.preventDefault()
        
        try {
            await axios.post('/api/project', { //posts the project to the project endpoint
                title: data.projectName,
                description: data.description,
                owner: {}, //don't yet have functionality for this
            })
            console.log('try block is successful')
        } catch (error) {
            console.log(error)
        }
    }

    return (

        <div className="ProjectCreationForm">
            <Heading>New Project</Heading>
            <FormControl id="projectName" isRequired /* the project name input */>
                <FormLabel>Enter your Project Name</FormLabel>
                <Input 
                    name='projectName' 
                    placeholder="Project Name"
                    value={data.projectName}
                    onChange={handleInputChange}
                />
            </FormControl>

            <FormControl id='description' /* the project description input */>
                <FormLabel>Describe your Project</FormLabel>
                <Input 
                    name='description'
                    placeholder="Description"
                    id="largeTextBox"
                    value={data.description}
                    onChange={handleInputChange}
                />
            </FormControl>

            <FormControl id='usersToAdd' /* the dropdown for users to add */>
                <FormLabel>Add Users</FormLabel>
                <Select
                    name='usersToAdd'
                    id='usersToAdd'
                    placeholder="Select Users to Add"
                >
                    {data.usersToAdd.map((user) => { //creates an option for each user on the project
                    return(
                        <option value={user}>{user}</option>
                    )
                })}
                </Select>
            </FormControl>
            
            <FormControl id='addedUsers' /* the list of users added to the project */>
                <FormLabel>Added Users</FormLabel>
                    <List 
                        id='addedUsers'
                    >
                        {data.usersAdded.map((user) => { //creates a container to put cards for all users
                            return(
                                <ListItem
                                    className='userOnProject'
                                >{user}</ListItem>
                            )
                        })}
                </List>            
            </FormControl>

            <FormControl id='createButton'>
                <Button
                    colorScheme="teal" 
                    size="sm"
                    onClick={handleSubmit}
                >Create</Button>
            </FormControl>
        </div>
    );
}