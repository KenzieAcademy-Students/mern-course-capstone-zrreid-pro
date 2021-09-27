import React, { useState } from 'react';
import { SignUpForm, SignInForm }  from '../../components';
import { useProvideAuth } from '../../hooks/useAuth';
import useRouter from '../../hooks/useRouter';
import setAuthToken from '../../utils/axiosConfig';
import './LoginPage.scss';

// import ProjectCreationForm from 'components/ProjectCreationForm';

const initialState = {
  username: '',
  password: '',
  email: '',
  avatar: [], //right now there is no functionality for this, but it's part of the model
  isSubmitting: false,
  errorMessage: null
}


export default function LoginPage() {
  const auth = useProvideAuth();
  const router = useRouter();
  const [ data, setData ] = useState(initialState); //sets the initial state of the signup form
  const [ isFlipped, setIsFlipped ] = useState(false);

  const handleInputChange = (event) => { //updates the data of the signup form
    setData({
      ...data, //keeps the previous values of the form
      [event.target.name]: event.target.value //changes the selected form field
    });
  }

  const handleSignUp = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null
    });

    const form = event.currentTarget;

    if(form.checkValidity() === false) {
      //do something
    }


    try{
      const response = await auth.signup(data.username, data.password, data.email, data.avatar);
      setAuthToken(response.token);
      router.push('/');
    } catch (error) {
      setData({
        ...data,
        isSubmitting: false,
        errorMessage: error ? error.message || error.statusText : null
      });
    }
  }

  const handleSignIn = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null
    });

    const form = event.currentTarget;

    if(form.checkValidity() === false) {
      //do something
    }

    try {
      const response = await auth.signin(data.email, data.password);
      setAuthToken(response.token);
      router.push('/');
    } catch (error) {
      setData({
        ...data,
        isSubmitting: false,
        errorMessage: error ? error.message || error.statusText : null
      });
    }
  }

  const formFlip = (event) => {
    setIsFlipped(!isFlipped);
  }

    return (
      <div className='page'>
        <div className='formCard'>
          <div className={`inner ${isFlipped ? 'flipped' : ''}`}>
            <SignUpForm
              handleSignUp={handleSignUp}
              handleInputChange={handleInputChange}
              handleFlip={formFlip}
              data={data}
            />

            <SignInForm
              handleSignIn={handleSignIn}
              handleInputChange={handleInputChange}
              handleFlip={formFlip}
              data={data}
            />
          </div>
        </div>
        {/* <ProjectCreationForm  /> */}
      </div>
    );
  }
