import React, { useState } from 'react'
import './SignUpForm.scss';

const emptySignUpForm = { //the initial state of the signup form
    username: '',
    password: '',
    emailAddress: '',
}

export default function SignUpForm() {

    const[data, setData] = useState(emptySignUpForm) //sets the initial state of the signup form

    const handleInputChange = (event) => { //updates the data of the signup form
        console.log(data)
        setData({
            ...data, //keeps the previous values of the form
            [event.target.name]: event.target.value, //changes the selected form field
        })
    }
    const handleSignUp = async (event) => {
        console.log(data.emailAddress)
        const form = event.currentTarget
        event.preventDefault()
        
    }

    return (
        <div>
            <input
                name="username"
                placeholder="Username"
                value={data.username}
                onChange={handleInputChange}
            />
            <input 
                name='password'
                placeholder='Password'
                value={data.password}
                onChange={handleInputChange}
            />
            <input 
                name='emailAddress'
                placeholder='Email Address'
                value={data.emailAddress}
                onChange={handleInputChange}
            />
            <button
                onClick={handleSignUp}
            >Submit</button>
        </div>
    )
}
