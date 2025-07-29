import React from 'react'
import Navbar from '../Pages/Shared/Navbar'
import { Outlet, useLocation } from 'react-router'
import Footer from '../Pages/Shared/Footer'
import useAuth from '../Hooks/useAuth'
import Loading from '../Components/Loaders/Loading'
import { motion } from 'framer-motion';

const MainLayout = () => {
    const { loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <Loading background={true} />
    }

    return (
        <div className=''>
            <header>
                <Navbar />
            </header>
            <main
                className='min-h-screen'>
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default MainLayout
