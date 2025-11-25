import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const location = useLocation()
    const {user, loading} = useAuth()

    if(loading){
        return <div className='flex justify-center items-center min-h-screen'><span className="loading loading-dots loading-2xl"></span></div>
    }

    if(!user){
        return <Navigate state={location?.pathname} to='/login'></Navigate>
    }
    return children
};

export default PrivateRoute;