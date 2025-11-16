import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../pages/Shared/Footer/Footer';
import Navbar from '../pages/Shared/Header/Navbar';

const Mainlayout = () => {
    return (
        <div className='max-w-7xl mx-auto '>
            <header>
                <Navbar/> 
            </header>
            <main>
                <Outlet/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>
    );
};

export default Mainlayout;