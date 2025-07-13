import React, { useContext } from 'react'
import { AuthContext } from '../Providers/AuthContext'

const useAuth = () => {
    const user = useContext(AuthContext)
  return user
}

export default useAuth
