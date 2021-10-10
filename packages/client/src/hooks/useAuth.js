import React, { useReducer, useEffect, useContext, createContext } from 'react';
import useRouter from 'hooks/useRouter';
import axios from '../utils/axiosConfig';

const initialState = {
    isAuthenticated: null,
    user: null,
}

const reducer = (state, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload,
        }
      case 'LOGOUT':
        // localStorage.removeItem('MernAppUser'); Switch this back later
        localStorage.clear();
        sessionStorage.clear();
        return {
          ...state,
          isAuthenticated: false,
          user: null,
        }
      case 'UPDATE':
        return {
          ...state,
          user: {...state.user, ...action.payload},
        }
      default:
        return state;
    }
}

const authContext = createContext();

export function ProvideAuth({ children }) {
    const [ state, dispatch ] = useReducer(reducer, initialState);
    return (
        <authContext.Provider
            value={{
                state,
                dispatch
            }}
        >
            {children}
        </authContext.Provider>
    );
}

//Call this hook in child components to access the current user
export const useAuth = () => {
    return useContext(authContext);
}

export function useProvideAuth() {
  const { state, dispatch } = useAuth();
  const router = useRouter();


  const signin = async (email, password) => {
      try {
        const response = await axios.post('auth/signin', {
          email: email,
          password: password,
        });

        // console.log('Response', response);

        localStorage.setItem('MernAppUser', JSON.stringify(response.data));

        dispatch({
          type: 'LOGIN',
          payload: response.data
        });

        return response;
      } catch (error) {
        // console.log('HERE');
        console.log(error.message);
        
        if(error.response) {
          throw new Error(error.response.data.error);
        } else {
          throw error;
        }
      }
  }

  const signup = async (username, password, email, avatar) => {
      try {
        await axios.post('auth/signup', {
          username: username,
          password: password,
          email: email,
          avatar: avatar
        });

        return await signin(email, password);
      } catch (error) {
        console.log(error);
        if(error.response) {
          throw new Error(error.response.data.error);
        } else {
          throw error;
        }
      }
  }

  const signout = () => {
    dispatch({
      type: 'LOGOUT'
    });
    router.push('/');
  }

  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('MernAppUser'));
  }

  const updateUser = async () => {
    const userResponse = await axios.get(`user/${state.user.uid}`);
    dispatch({
      type: 'UPDATE',
      payload: userResponse.data
    });
    localStorage.setItem('MernAppUser', JSON.stringify({...state, user: userResponse.data}));
  }

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('MernAppUser')) || false;

    if(savedUser) {
      dispatch({
        type: 'LOGIN',
        payload: savedUser
      });
    } else {
      dispatch({
        type: 'LOGOUT'
      });
    }
  }, [dispatch]);

  return {
    state,
    signup,
    signin,
    signout,
    getCurrentUser,
    updateUser
  };
}