import React, { useState } from 'react';
import './LoginPage.scss';
import { SignUpForm }  from '../../components' //wasn't working because there were two exports of signupform from components index
import axios from 'axios' //axios has only been added to my branch
import SignInForm from 'components/SignInForm';


export default function LoginPage() {  
    const emptyForm = { //the initial state of the signup form
      username: '',
      password: '',
      emailAddress: '',
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
        
        try {
            await axios.post('auth/signup', { //posts the new user onto the signup endpoint
                username: data.username,
                passwordHash: data.password, //the data model for the user is passwordHash, but alex will handle the password hashing 
                email: data.emailAddress,
            })
            console.log('the try block of the signup request is running')
        } catch (error) { //the try block is failing, the endpoints might not be set up yet
            console.log(error)
        }
    }

    const handleSignIn = async (event) => {
      
    }


    return (
      <div>
        <SignUpForm handleSignUp={handleSignUp} handleInputChange={handleInputChange} data={data} /* the functions get passed in as props to the components */ />
        <SignInForm handleSignIn={handleSignIn} handleInputChange={handleInputChange} data={data} />
      </div>
    );
  }