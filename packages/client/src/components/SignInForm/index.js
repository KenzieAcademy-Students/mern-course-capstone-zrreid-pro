// import { Button } from '@chakra-ui/button';
// import { FormControl, FormLabel } from '@chakra-ui/form-control';
// import { Input } from '@chakra-ui/input';
// import { Heading } from '@chakra-ui/layout';
import { Heading, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import React, { useState } from 'react'
import './SignInForm.scss'

export default function SignInForm(props) {

    const{ handleInputChange, handleSignIn, data } = props //doing the same as the signup form



    return (
        <div className='SignInForm'>
            <Heading>Sign In</Heading>

            <FormControl id='username' isRequired>
                <FormLabel>Enter your Username</FormLabel>
                <Input 
                    name='username'
                    placeholder='username'
                    value={data.username}
                    onChange={handleInputChange}
                />
            </FormControl>

            <FormControl id='emailAddress'>
                <FormLabel>Enter your Email Address</FormLabel>
                <Input 
                    name="emailAddress"
                    placeholder="Email Address" 
                    value={data.emailAddress}
                    onChange={handleInputChange}
                />
            </FormControl>

            <FormControl id='password' isRequired>
                <FormLabel>Enter your Password</FormLabel>
                <Input 
                    name="password"
                    placeholder="Password"
                    value={data.password}
                    onChange={handleInputChange}
                />
            </FormControl>

            <FormControl id='submitButton'>
                <Button
                    colorScheme="teal" 
                    size="sm"
                    onClick={handleSignIn}
                >Submit</Button>
            </FormControl>
        </div>
    )
}
