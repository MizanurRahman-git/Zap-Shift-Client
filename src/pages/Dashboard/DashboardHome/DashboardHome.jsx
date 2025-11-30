import React from 'react';
import useRole from '../../../Hooks/useRole';
import AdminDashboardHome from './AdminDashboardHome';
import RiderDashboardHome from './RiderDashboardHome';
import UserDashboardHome from './UserDashboardHome';

const DashboardHome = () => {
    const {role, roleLoading} = useRole()

    if(roleLoading){
        return <div className='flex justify-center items-center min-h-screen'><span className="loading loading-dots loading-2xl"></span></div>
    }
    if(role === "admin"){
        return <AdminDashboardHome/>
    }
    else if(role === "Rider"){
        return <RiderDashboardHome/>
    }
    else{
        return <UserDashboardHome/>
    }
};

export default DashboardHome;