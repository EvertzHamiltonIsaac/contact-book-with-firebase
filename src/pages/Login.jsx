import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth} from '../firebase/firebase';
import {useAuth} from '../context/AuthContext'


const Login = ({ setIsLogged }) => {

    const {user} = useAuth();
    console.log(user);

    return (
        <article className="login">
            <button>Login With google</button>
        </article>
    )
}

export default Login