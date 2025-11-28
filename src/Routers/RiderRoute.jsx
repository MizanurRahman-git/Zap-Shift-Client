import React from 'react';
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';
import { useNavigate } from 'react-router';

const RiderRoute = ({children}) => {
    const {loading, user} = useAuth()
    const {role, roleLoading} = useRole()
    const navigate = useNavigate()

    if( loading || !user || roleLoading ) {
        return <div className='flex justify-center items-center min-h-screen'><span className="loading loading-dots loading-2xl"></span></div>
    }

    if( role !== 'Rider') {
        return navigate('/')
    }
    return children;
};

export default RiderRoute;