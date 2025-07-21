import React from 'react';
import { Navigate } from 'react-router';
import useAuth from '../Hooks/useAuth';
import Loading from '../Components/Loaders/Loading';

const PrivateRoute = ({children}) => {
    const {profile, loading} = useAuth();

    if (loading) {
        return <Loading />
    }

    if (!profile) {
        return <Navigate to="/login" />
    }

    return children
};

export default PrivateRoute;