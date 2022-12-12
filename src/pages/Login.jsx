import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react';
import {auth} from '../firebase/firebase';

const SignInWithGoogle = async (googleProvider) => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        console.log(res)
    } catch (error) {
        console.log(error);
    }
}

const HandleOnClick = async () => {
    const googleProvider = await new GoogleAuthProvider();
    SignInWithGoogle(googleProvider);
}

const Login = () => {
  return (
    <article className="login">
        <button onClick={HandleOnClick}>Login With google</button>
    </article>
  )
}

export default Login