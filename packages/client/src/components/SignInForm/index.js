import React from 'react'
// import { Heading, FormControl,
//     // FormLabel,
//     Input, Button, Box } from '@chakra-ui/react';
import './SignInForm.scss'

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

    // return (
    //     <div id='SignInForm' className='form back'>
    //         <Heading>LOGIN</Heading>
            
    //         <FormControl isRequired>
    //             {/* <FormLabel>Enter your Email Address</FormLabel> */}
    //             <Input
    //                 type='email'
    //                 name='email'
    //                 placeholder='Email'
    //                 value={data.email}
    //                 onChange={handleInputChange}
    //             />
    //         </FormControl>

    //         <FormControl isRequired>
    //             {/* <FormLabel>Enter your Password</FormLabel> */}
    //             <Input
    //                 type='password'
    //                 name='password'
    //                 placeholder='Password'
    //                 value={data.password}
    //                 onChange={handleInputChange}
    //             />
    //         </FormControl>

    //         <FormControl>
    //             <Button
    //                 colorScheme='teal' 
    //                 size='sm'
    //                 onClick={handleSignIn}
    //             >Submit</Button>
    //         </FormControl>

    //         <Box className='flipPrompt'>Not a member? Click <span onClick={handleFlip}>here</span></Box>
    //     </div>
    // );

    // return (
    //     <div id='SignInForm' className='form back'>
    //         <Heading>Sign In</Heading>
            
    //         <FormControl id='email' isRequired>
    //             <FormLabel>Enter your Email Address</FormLabel>
    //             <Input 
    //                 name='email'
    //                 placeholder='Email'
    //                 value={data.email}
    //                 onChange={handleInputChange}
    //             />
    //         </FormControl>

    //         <FormControl id='password' isRequired>
    //             <FormLabel>Enter your Password</FormLabel>
    //             <Input 
    //                 name='password'
    //                 placeholder='Password'
    //                 value={data.password}
    //                 onChange={handleInputChange}
    //             />
    //         </FormControl>

    //         <FormControl id='submitButton'>
    //             <Button
    //                 colorScheme='teal' 
    //                 size='sm'
    //                 onClick={handleSignIn}
    //             >Submit</Button>
    //         </FormControl>
    //     </div>
    // );
}
