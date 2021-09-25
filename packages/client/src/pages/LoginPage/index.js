import React, { useState } from 'react';
import { SignUpForm, SignInForm }  from '../../components';
import { useProvideAuth } from '../../hooks/useAuth';
import useRouter from '../../hooks/useRouter';
import setAuthToken from '../../utils/axiosConfig';
import './LoginPage.scss';

import ProjectCreationForm from 'components/ProjectCreationForm';

const initialState = {
  username: '',
  password: '',
  email: '',
  avatar: [], //right now there is no functionality for this, but it's part of the model
  isSubmitting: false,
  errorMessage: null
}


export default function LoginPage() {
  const auth = useProvideAuth();
  const router = useRouter();
  const [data, setData] = useState(initialState); //sets the initial state of the signup form

  const handleInputChange = (event) => { //updates the data of the signup form
    setData({
      ...data, //keeps the previous values of the form
      [event.target.name]: event.target.value //changes the selected form field
    });
  }

  const handleSignUp = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null
    });

    const form = event.currentTarget;

    if(form.checkValidity() === false) {
      //do something
    }


    try{
      const response = await auth.signup(data.username, data.password, data.email, data.avatar);
      setAuthToken(response.token);
      router.push('/');
    } catch (error) {
      setData({
        ...data,
        isSubmitting: false,
        errorMessage: error ? error.message || error.statusText : null
      });
    }
  }

  const handleSignIn = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null
    });

    const form = event.currentTarget;

    if(form.checkValidity() === false) {
      //do something
    }

    try {
      const response = await auth.signin(data.email, data.password);
      setAuthToken(response.token);
      router.push('/');
    } catch (error) {
      setData({
        ...data,
        isSubmitting: false,
        errorMessage: error ? error.message || error.statusText : null
      });
    }
  }
    
    // const handleSignUp = async (event) => { //the function that runs when the form is submitted
    //     console.log(data) //proves that the form is complete when the submit button is pressed
    //     event.preventDefault()

    //     try {
    //       await auth.signup(data.username, data.password, data.emailAddress, data.avatar)
    //     } catch (error) {
    //       console.log(error)
    //     }

        
        
    //     try {
    //         await axios.post('/api/auth/signup', { //posts the new user onto the signup endpoint
    //             username: data.username,
    //             password: data.password, //the data model for the user is passwordHash, but alex will handle the password hashing 
    //             email: data.emailAddress,
    //             avatar: [data.avatar],
    //         })
    //         console.log('the try block of the signup request is running')
    //     } catch (error) { 
    //         console.log(error)
    //     }
    // }

    // const handleSignIn = async (event) => {
    //   console.log(data)
    //   event.preventDefault()

    //   try {
        
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }


    return (
      <div>
        <SignUpForm handleSignUp={handleSignUp} handleInputChange={handleInputChange} data={data} /* the functions get passed in as props to the components */ />
        {/* <SignInForm handleSignIn={handleSignIn} handleInputChange={handleInputChange} data={data} /> */}
        {/* <ProjectCreationForm  /> */}
      </div>
    );
  }
