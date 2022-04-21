import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User, UserCredential } from 'firebase/auth'
import React, { createContext, useEffect, useState } from 'react'
import { auth } from '../config/config'

type UserContextType = {
    setUser: React.Dispatch<React.SetStateAction<User | null | undefined>>
    user: User | null | undefined
    login: (email: string, password: string) => Promise<UserCredential>
    signup: (email: string, password: string) => Promise<UserCredential>
    LogOut: () => Promise<void>
}

export const UserAuthContext = createContext<UserContextType | null>(null);

export const Userauth = ({ children }: any) => {

    const [user, setUser] = useState<User | null | undefined>(null)
    const [loading, setLoading] = useState(true)

    //signup function

    const signup = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    //login function

    const login = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    //logout function

    const LogOut = () => {
        return signOut(auth)
    }

    //function to know if user is loggedin or loggedout realtime

    useEffect(() => {
        const Unsubscribe = onAuthStateChanged(auth, (cred) => {
            setLoading(false)
            setUser(cred)
        })

        return () => {
            Unsubscribe()
        }
    }, [])


    return (
        <UserAuthContext.Provider value={{ setUser, login, signup, LogOut, user }}>
            {!loading && children}
        </UserAuthContext.Provider >
    )
}

export default Userauth;


