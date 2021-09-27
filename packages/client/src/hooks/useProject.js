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
    const { state: { user } } = useProvideAuth();
    const { state, dispatch } = useProject();

    const fetchProject = async (pid) => {
        try {
            const response = await axios.get(`project/${pid}`);
            dispatch({
                type: 'LOAD',
                payload: response.data
            });
            localStorage.setItem('MernAppProject', JSON.stringify(response.data));
        } catch (error) {
            console.log('Fetch Project Error');
        }
    }

    const createProject = async (data) => {
        const { title, description, users } = data;
        try {
            const response = await axios.post('/', {
                title,
                description,
                owner: user.uid,
                categories: [],
                tags: [],
                users,
                tasks: []
            });

            localStorage.setItem('MernAppProject', JSON.stringify(response.data));

            dispatch({
                type: 'LOAD',
                payload: response.data
            });
        } catch (error) {
            console.log('Create Project Error');
        }

    }

    const updateProjectCategories = async (categories) => {
        try {
            const response = await axios.put(`${state._id}/category`, {
                categories
            });

            dispatch({
                type: 'UPDATE',
                payload: ['categories', categories]
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

    useEffect(() => {
        const savedProject = JSON.parse(localStorage.getItem('MernAppProject')) || false;
        if(savedProject) {
            dispatch({
                type: 'LOAD',
                payload: savedProject
            });
        } else {
            fetchProject(user.project_list[0]._id);
        }

    }, [dispatch]);

    return {
        project: state,
        fetchProject,
        createProject,
        updateProjectCategories,
        updateProjectUsers,
        updateProjectTags
    };
}

export default useProvideProject;