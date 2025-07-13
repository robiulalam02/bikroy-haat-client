import React from 'react'
import Navbar from '../Pages/Shared/Navbar'
import { Outlet } from 'react-router'
import Footer from '../Pages/Shared/Footer'
import useAuth from '../Hooks/useAuth'
import Loading from '../Components/Loaders/Loading'

const MainLayout = () => {
    const {loading} = useAuth();

    if (loading) {
        return <Loading />
    }

    return (
        <div>
            <header>
                <Navbar />
            </header>
            <main className='min-h-screen'>
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default MainLayout
