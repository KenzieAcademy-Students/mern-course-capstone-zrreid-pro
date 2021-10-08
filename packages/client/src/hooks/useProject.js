import React, { useReducer, useEffect, useContext, createContext } from 'react';
import { useProvideAuth } from './useAuth';
import axios from '../utils/axiosConfig';

const dummyProject = {
    title: 'TaskMaster',
    description: 'lorem ipsum and all that',
    owner: 'I',
    // deadline: new Date('9/27/21'),
    tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'],
    users: ['I', 'myself', 'me', 'someone'],
    categories: ['cat1', 'cat2'],
    tasks: []
  };

const initialState = {};

const reducer = (state, action) => {
    switch (action.type) {
        case 'LOAD':
            return {
                ...action.payload
            };
        case 'UPDATE':
            return {
                ...state,
                [action.payload[0]]: action.payload[1]
            }
        default:
            return state;
    }
}

const projectContext = createContext();

export function ProvideProject({ children }) {
    const [ state, dispatch ] = useReducer(reducer, initialState);
    return (
        <projectContext.Provider
            value={{ state, dispatch }}
        >
            { children }
        </projectContext.Provider>
    );
}

export const useProject = () => {
    return useContext(projectContext);
}

// Need to change the code so that it only saves the project id in local storage and then refetches it on reload
export function useProvideProject() {
    const { state: { user }, updateUser } = useProvideAuth();
    const { state, dispatch } = useProject();

    const fetchProject = async (pid) => {
        try {
            const response = await axios.get(`project/${pid}`);
            dispatch({
                type: 'LOAD',
                payload: response.data
            });

            // localStorage.setItem('MernAppProject', JSON.stringify(response.data));
            localStorage.setItem('MernAppProject', response.data._id);
        } catch (error) {
            console.log('Fetch Project Error:', error);
        }
    }

    const createProject = async (data) => {
        const { title, description, users } = data;
        try {
            const response = await axios.post('project/', {
                title: title,
                description: description,
                owner: user.uid,
                status_categories: [
                    { label: 'Not Started', color: '#FF0000' },
                    { label: 'Completed', color: '#18DA00' }
                ],
                tags: [],
                users: [user.uid, ...users],
                tasks: []
            });

            // localStorage.setItem('MernAppProject', JSON.stringify(response.data));
            localStorage.setItem('MernAppProject', response.data._id);

            updateUser();

            dispatch({
                type: 'LOAD',
                payload: response.data
            });
        } catch (error) {
            console.log('Create Project Error:', error);
        }

    }

    const updateProject = async (description) => {
        try {
            await axios.put(`project/${state._id}/description`, {
                description: description
            });

            dispatch({
                type: 'UPDATE',
                payload: ['description', description]
            });
        } catch (error) {
            console.log('Description Update Error:', error);
        }
    }

    const updateProjectCategories = async (status_categories) => {
        try {
            const response = await axios.put(`${state._id}/category`, {
                status_categories
            });

            dispatch({
                type: 'UPDATE',
                payload: ['status_categories', status_categories]
            });
        } catch (error) {
            console.log('Update Categories Error');
        }
    }

    const updateProjectUsers = async (users) => {
        try {
            const response = await axios.put(`${state._id}/user`, {
                users
            });

            dispatch({
                type: 'UPDATE',
                payload: ['users', users]
            });
        } catch (error) {
            console.log('Update Users Error');
        }
    }

    const updateProjectTags = async (tags) => {
        try {
            const response = await axios.put(`${state._id}/tags`, {
                tags
            });

            dispatch({
                type: 'UPDATE',
                payload: ['tags', tags]
            });
        } catch (error) {
            console.log('Update Tags Error');
        }
    }

    const createTask = async (data) => {
        try {
            const response = await axios.post(`task/${state._id}`, {
                objective: data.objective,
                status: data.status,
                notes: data.notes
            });

            const updatedProject = {
                ...state,
                tasks: [...state.tasks, response.data]
            };

            dispatch({
                type: 'LOAD',
                payload: updatedProject
            });
        } catch (error) {
            console.log('Task Creation Error');
        }
    }

    const updateTask = async () => {
        //put axios call to update task
        //call fetch project to get new version of project
    }

    // useEffect(() => {
    //     // console.log('USE_EFFECT');
    //     // const savedProject = JSON.parse(localStorage.getItem('MernAppProject')) || false;
    //     // const savedProject = localStorage.getItem('MernAppProject') || false;
    //     // if(savedProject) {
    //     //     // dispatch({
    //     //     //     type: 'LOAD',
    //     //     //     payload: savedProject
    //     //     // });
    //     //     fetchProject(savedProject);
    //     // } else {
    //     //     if(user.project_list.length !== 0) {
    //     //         fetchProject(user.project_list[0]._id);
    //     //     }
    //     // }
    //     console.log('Project:', state);


    // }, [state]);

    return {
        project: state,
        fetchProject,
        createProject,
        updateProject,
        updateProjectCategories,
        updateProjectUsers,
        updateProjectTags,
        createTask
    };
}

export default useProvideProject;