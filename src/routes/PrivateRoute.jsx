import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../Hooks/useAuth';
import Loading from '../Components/Loaders/Loading';

const PrivateRoute = ({children}) => {
    const {profile, loading} = useAuth();
    const location = useLocation();
    // console.log(location);

    if (loading) {
        return <Loading />
    }

    if (!profile) {
        return <Navigate state={location.pathname} to="/login" />
    }

    return children
};

export default PrivateRoute;