import React, { useState } from 'react';
import './LoginPage.scss';
import { SignUpForm }  from '../../components'
import axios from 'axios'


export default function LoginPage() {  
    const emptySignUpForm = { //the initial state of the signup form
      username: '',
      password: '',
      emailAddress: '',
    }
    const[data, setData] = useState(emptySignUpForm) //sets the initial state of the signup form

    
    const handleInputChange = (event) => { //updates the data of the signup form
      setData({
          ...data, //keeps the previous values of the form
          [event.target.name]: event.target.value, //changes the selected form field
      })
    }
    const handleSignUp = async (event) => { //the function that runs when the form is submitted
        console.log(data)
        event.preventDefault()
        
        try {
            await axios.post('auth/signup', { //posts the new user onto the signup endpoint
                username: data.username,
                passwordHash: data.password, //the data model for the user is passwordHash, but alex will handle the password hashing 
                email: data.emailAddress,
            })
            console.log('the try block of the signup request is running')
        } catch (error) {
            console.log(error)
        }
    }


    return (
      <div>
        <SignUpForm handleSignUp={handleSignUp} handleInputChange={handleInputChange} data={data} />
      </div>
    );
  }