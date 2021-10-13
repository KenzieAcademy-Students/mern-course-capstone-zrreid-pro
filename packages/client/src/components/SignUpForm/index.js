import React from 'react';
import ColorPicker from '../ColorPicker';
import './SignUpForm.scss';

export default function SignUpForm({
    data,
    handleInputChange,
    handleSignUp,
    handleFlip,
    colorSelect
}) {
    return (
        <div id='SignUpForm' className='form front'>
            <h1 className='form-heading'>BECOME A MEMBER</h1>

            <input
                className='form-input'
                type='text'
                name='username'
                placeholder='Username'
                value={data.username}
                onChange={handleInputChange}
                autoComplete='off'
                autoFocus
                required
            />

            <input
                className='form-input'
                type='email'
                name='email'
                placeholder='Email'
                value={data.email}
                onChange={handleInputChange}
                autoComplete='off'
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

            <ColorPicker value={data?.avatar?.color} colorSelect={colorSelect} />

            <button className='submit-button' onClick={handleSignUp}>Submit</button>

            <div className='flipPrompt'>Already have an account? Click <span onClick={handleFlip}>here</span></div>
        </div>
    );
}
