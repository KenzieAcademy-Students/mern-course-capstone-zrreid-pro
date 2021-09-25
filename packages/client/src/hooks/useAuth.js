import React, { useReducer, useEffect, useContext, createContext } from 'react';
import useRouter from 'hooks/useRouter';
import axios from '../utils/axiosConfig.js';

const initialState = {
    // isAuthenticated: null,
    user: null,
}

const reducer = (state, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
        //   isAuthenticated: true,
          user: action.payload,
        }
      case 'LOGOUT':
        localStorage.clear()
        return {
          ...state,
        //   isAuthenticated: false,
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
    const [state, dispatch] = useReducer(reducer, initialState);
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
      
  }

  const signup = async (username, password, email, avatar) => { //currently, the try block isn't running
      try {
        await axios.post('/api/auth/signup', { //posts the new user onto the signup endpoint
          username: username,
          password: password, //the data model for the user is passwordHash, but alex will handle the password hashing 
          email: email,
          avatar: avatar,
      })
      alert('Account Created Successfully')
      } catch (error) {
        console.log(error);
        alert('Account Creation Failed')
      }
  }
  return {
    signup,
    signin,
  }
}