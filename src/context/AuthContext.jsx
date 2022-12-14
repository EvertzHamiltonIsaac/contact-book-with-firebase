import { createContext } from "react";
import React, { useContext} from 'react';
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../firebase/firebase'

const authContext = createContext()

export const useAuth = () => {
    const context = useContext(authContext)
    if (!context) throw new Error('There us not Auth provider')
    return context
}

export function AuthProvider({children}) {

    const signup = (email, password) => createUserWithEmailAndPassword(auth,email,password)

    return <authContext.Provider value={{signup}}>{children}</authContext.Provider>
}