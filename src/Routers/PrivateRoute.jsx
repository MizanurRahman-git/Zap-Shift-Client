import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const location = useLocation()
    const {user, Loading} = useAuth()

    if(Loading){
        return <span className="loading loading-dots loading-xl"></span>
    }

    if(!user){
        return <Navigate state={location?.pathname} to='/login'></Navigate>
    }
    return children
};

export default PrivateRoute;