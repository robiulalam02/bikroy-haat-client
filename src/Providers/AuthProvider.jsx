import React, { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from '../Firebase/firebase.init';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { toast } from 'react-toastify';

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    const axiosPublic = useAxiosPublic();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

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
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setLoading(false)
            if (currentUser) {
                setProfile(currentUser);
                const user = { email: currentUser?.email }; // fix: wrap as object for POST
                try {
                    const res = await axiosPublic.post("/api/jwt", user);
                    localStorage.setItem("access-token", res.data.token);
                } catch (error) {
                    console.error("Login failed", error);
                    toast.error("Login failed!");
                }

            } else {
                setProfile(null);
                localStorage.removeItem("access-token");
            }
        });

        return () => unsubscribe();
    }, []);


    const user = {
        userRegister,
        userLogin,
        googleSignIn,
        updateUserProfile,
        userSignOut,
        profile,
        loading,
        setLoading
    }

    return (
        <AuthContext value={user}>
            {children}
        </AuthContext>
    )
}

export default AuthProvider
