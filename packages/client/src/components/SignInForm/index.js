import React, { useState } from 'react'
import './SignInForm.scss'

export default function SignInForm() {
    const emptySignInForm = {
        emailAddress: '',
        password: '',
    }

    const[data, setData] = useState(emptySignInForm)

    return (
        <div>
            
        </div>
    )
}
