import React from 'react'
import { AuthContext } from './AuthContext'

const AuthProvider = ({ children }) => {
    const user = {
        num: 10
    }
    return (
        <AuthContext value={user}>
            {children}
        </AuthContext>
    )
}

export default AuthProvider
