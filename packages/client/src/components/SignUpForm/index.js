import React from 'react'
import './SignUpForm.scss';



export default function SignUpForm(props) {
    const { handleInputChange, handleSignUp, data } = props //destructuring the functions and the data values from the login page
    
    //saving the functionality here just in case the login page is changed
    //const[data, setData] = useState(emptySignUpForm) //sets the initial state of the signup form

    // const handleInputChange = (event) => { //updates the data of the signup form
    //     console.log(event.target.value)
    //     setData({
    //         ...data, //keeps the previous values of the form
    //         [event.target.name]: event.target.value, //changes the selected form field
    //     })
    // }
    // const handleSignUp = async (event) => { //the function that runs when the form is submitted
    //     console.log(data)
    //     event.preventDefault()
        
    //     try {
    //         await axios.post('auth/signup', {
    //             username: data.username,
    //             passwordHash: data.password,
    //             email: data.emailAddress,
    //         })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    return (
        <div>
            <h1>Sign Up Here</h1>
            <input //the username input field
                name="username"
                placeholder="Username"
                value={data.username}
                onChange={handleInputChange}
            />
            <input //the password input field
                name='password'
                placeholder='Password'
                value={data.password}
                onChange={handleInputChange}
            />
            <input //the emailAddress input field
                name='emailAddress'
                placeholder='Email Address'
                value={data.emailAddress}
                onChange={handleInputChange}
            />
            <button //the submit button
                onClick={handleSignUp}
            >Submit</button>
        </div>
    )
}
