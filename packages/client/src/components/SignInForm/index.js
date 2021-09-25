import React from 'react'
import { Heading, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import './SignInForm.scss'

export default function SignInForm({
    data,
    handleInputChange,
    handleSignIn
}) {
    return (
        <div className='SignInForm'>
            <Heading>Sign In</Heading>
            
            <FormControl id='email' isRequired>
                <FormLabel>Enter your Email Address</FormLabel>
                <Input 
                    name='email'
                    placeholder='Email'
                    value={data.email}
                    onChange={handleInputChange}
                />
            </FormControl>

            <FormControl id='password' isRequired>
                <FormLabel>Enter your Password</FormLabel>
                <Input 
                    name='password'
                    placeholder='Password'
                    value={data.password}
                    onChange={handleInputChange}
                />
            </FormControl>

            <FormControl id='submitButton'>
                <Button
                    colorScheme='teal' 
                    size='sm'
                    onClick={handleSignIn}
                >Submit</Button>
            </FormControl>
        </div>
    )
}
