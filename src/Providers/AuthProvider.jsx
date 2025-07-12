import React, { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from '../Firebase/firebase.init';

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    const [profile, setProfile] = useState(null);

    const userRegister = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const userLogin = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleSignIn = () => {
        return signInWithPopup(auth, provider)
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }

    const userSignOut = () => {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setProfile(currentUser)
            } else{
                setProfile(null)
            }
        })
        return () => unsubscribe;
    }, [])

    const user = {
        userRegister,
        userLogin,
        googleSignIn,
        updateUserProfile,
        userSignOut,
        profile
    }

    return (
        <AuthContext value={user}>
            {children}
        </AuthContext>
    )
}

export default AuthProvider
