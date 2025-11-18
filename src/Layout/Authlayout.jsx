import React from 'react';
import Logo from '../Components/Logo/Logo';
import { Outlet } from 'react-router';
import authIma from '../assets/authImage.png'

const Authlayout = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <Logo/>
            <div className='flex'>
                <div className='flex-1'>
                    <Outlet/>
                </div>
                <div className='flex-1'>
                    <img src={authIma} alt="logo" />
                </div>
            </div>
        </div>
    );
};

export default Authlayout;