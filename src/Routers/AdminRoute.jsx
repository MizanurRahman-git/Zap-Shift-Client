import React from 'react';
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';
import { useNavigate } from 'react-router';

const AdminRoute = ({children}) => {
    const {loading} = useAuth()
    const {role, roleLoading} = useRole()
    const navigate = useNavigate()

    if( loading || roleLoading ) {
        return <div className='flex justify-center items-center min-h-screen'><span className="loading loading-dots loading-2xl"></span></div>
    }

    if( role !== 'admin') {
        return navigate('/')
    }
    return children;
};

export default AdminRoute;