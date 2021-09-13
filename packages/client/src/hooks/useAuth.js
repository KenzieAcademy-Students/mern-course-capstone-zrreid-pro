import React, { useReducer, useEffect, useContext, createContext } from 'react';
import useRouter from 'hooks/useRouter';
import axios from 'utils/axiosConfig.js';

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
}

const signin = async (email, password) => {

}

const signup = async (username, password, email, avatar) => {
    
}