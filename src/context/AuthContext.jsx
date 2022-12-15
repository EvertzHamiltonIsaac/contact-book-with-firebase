import { createContext, useEffect, useState } from "react";
import React, { useContext } from 'react';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut, 
    GoogleAuthProvider, 
    signInWithPopup,
    sendPasswordResetEmail
} from 'firebase/auth'
import { auth } from '../firebase/firebase'

const authContext = createContext()

export const useAuth = () => {
    const context = useContext(authContext)
    if (!context) throw new Error('There us not Auth provider')
    return context
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password)
    const signin = (email, password) => signInWithEmailAndPassword(auth, email, password)
    const signout = () => signOut(auth)
    const signinwithgoogle = () => {
        const googleProvider = new GoogleAuthProvider()
        return signInWithPopup(auth, googleProvider)
    }
    const resetPassword = () => {
        sendPasswordResetEmail(auth, email)
    }
    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setIsLoading(false);
        })

        return () => unsubcribe()
    }, [])


    return <authContext.Provider value={{ signup, signin, signout, user, isLoading, signinwithgoogle, resetPassword}}>{children}</authContext.Provider>
}