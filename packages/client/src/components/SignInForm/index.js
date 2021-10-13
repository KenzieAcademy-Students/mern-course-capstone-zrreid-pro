import React from 'react';

export default function SignInForm({
    data,
    handleInputChange,
    handleSignIn,
    handleFlip
}) {
    return (
        <div id='SignInForm' className='form back'>
            <h1 className='form-heading'>LOGIN</h1>
            <input
                className='form-input'
                type='email'
                name='email'
                placeholder='Email'
                value={data.email}
                onChange={handleInputChange}
                autoComplete='off'
                autoFocus
                required
            />

            <input
                className='form-input'
                type='password'
                name='password'
                placeholder='Password'
                value={data.password}
                onChange={handleInputChange}
                autoComplete='off'
                required
            />

            <button className='submit-button' onClick={handleSignIn}>Submit</button>

            <div className='flipPrompt'>Not a member? Click <span onClick={handleFlip}>here</span></div>
        </div>
    );
}
