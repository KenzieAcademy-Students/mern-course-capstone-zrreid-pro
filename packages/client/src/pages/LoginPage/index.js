import React, { useState } from 'react';
import './LoginPage.scss';
import { SignUpForm }  from '../../components' //wasn't working because there were two exports of signupform from components index
import axios from 'axios' //axios has only been added to my branch
import SignInForm from 'components/SignInForm';
import { useAuth, useProvideAuth } from '../../hooks/useAuth'

import ProjectCreationForm from 'components/ProjectCreationForm';


export default function LoginPage() {  
    const emptyForm = { //the initial state of the signup form
      username: '',
      password: '',
      emailAddress: '',
      avatar: [], //right now there is no functionality for this, but it's part of the model
    }

    
    
    const[data, setData] = useState(emptyForm) //sets the initial state of the signup form

    
    const handleInputChange = (event) => { //updates the data of the signup form
      setData({
          ...data, //keeps the previous values of the form
          [event.target.name]: event.target.value, //changes the selected form field
      })
    }
    
    const handleSignUp = async (event) => { //the function that runs when the form is submitted
        console.log(data) //proves that the form is complete when the submit button is pressed
        event.preventDefault()

        useProvideAuth().signup(data.username, data.password, data.emailAddress, data.avatar)
        
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
    }

    const handleSignIn = async (event) => {
      console.log(data)
      event.preventDefault()

      try {
        
      } catch (error) {
        console.log(error)
      }
    }


    return (
      <div>
        <SignUpForm handleSignUp={handleSignUp} handleInputChange={handleInputChange} data={data} /* the functions get passed in as props to the components */ />
        <SignInForm handleSignIn={handleSignIn} handleInputChange={handleInputChange} data={data} />
        <ProjectCreationForm /* only on this page so i can see the progress */ />
      </div>
    );
  }
