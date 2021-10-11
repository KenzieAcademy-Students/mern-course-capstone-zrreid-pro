import React from 'react';
import ColorPicker from '../ColorPicker';
import { CompactPicker } from 'react-color';
// import { Heading, FormControl,
//     // FormLabel,
//     Input, Button, Box } from '@chakra-ui/react';
import './SignUpForm.scss';

// class ColorPicker extends 

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

    // return (
    //     <div id='SignUpForm' className='form front'>
    //         <Heading>BECOME A MEMBER</Heading>

    //         <FormControl isRequired>
    //             {/* <FormLabel>Enter your Username</FormLabel> */}
    //             <Input
    //                 type='text'
    //                 name='username'
    //                 placeholder='Username'
    //                 value={data.username}
    //                 onChange={handleInputChange}
    //             /> 
    //         </FormControl>

    //         <FormControl isRequired>
    //             {/* <FormLabel>Enter your Email</FormLabel> */}
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
    //             <Input //the password input field
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
    //                 onClick={handleSignUp}
    //             >Submit</Button>
    //         </FormControl>

    //         <Box className='flipPrompt'>Already have an account? Click <span onClick={handleFlip}>here</span></Box>
    //     </div>
    // );
}
