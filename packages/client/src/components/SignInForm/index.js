import React, { useState } from 'react'
import './SignInForm.scss'

export default function SignInForm(props) {

    const{ handleInputChange, handleSignIn, data } = props



    return (
        <div>
            <h1>Sign In</h1>
            <input 
                name="emailAddress"
                placeholder="Email Address" 
                value={data.emailAddress}
                onChange={handleInputChange}
            />
            <input
                name="password"
                placeholder="Password"
                value={data.password}
                onChange={handleInputChange}
            />
            <button
                onClick={handleSignIn}
            >Submit</button>
        </div>
    )
}
