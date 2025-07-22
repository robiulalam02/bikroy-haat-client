import React from 'react'
import { NavLink, Outlet } from 'react-router'
import Logo from '../Components/Logo/Logo'
import Navbar from '../Components/Dashboard/Navbar'
import Footer from '../Components/Dashboard/Footer'
import Loading from '../Components/Loaders/Loading'
import useAuth from '../Hooks/useAuth'
import useUserRole from '../Hooks/useUserRole'

const Dashboard = () => {

    const { isVendor, isUser, isAdmin, isLoading } = useUserRole();
    console.log(isVendor)

    const links = <>
        <li className='h-14'>
            <NavLink to="/dashboard">Home</NavLink>
        </li>
        {
            isVendor && !isLoading &&
            <>
                <li className='h-14'>
                    <NavLink to="/dashboard/add-product">Add Product</NavLink>
                </li>
                <li className='h-14'>
                    <NavLink to="/dashboard/my-products">My Product</NavLink>
                </li>
                <li className='h-14'>
                    <NavLink to="/dashboard/add-advertisements">Add Advertisement</NavLink>
                </li>
                <li className='h-14'>
                    <NavLink to="/dashboard/my-advertisements">My Advertisement</NavLink>
                </li>
            </>
        }
        {
            isUser && !isLoading &&
            <>
                <li className='h-14'>
                    <NavLink to="/dashboard/view-price-trends">View Price Trends</NavLink>
                </li>
                <li className='h-14'>
                    <NavLink to="/dashboard/manage-watchlist">Manage Watchlist</NavLink>
                </li>
                <li className='h-14'>
                    <NavLink to="/dashboard/my-orders">My Orders</NavLink>
                </li>
            </>
        }
        {
            isAdmin && !isLoading &&
            <>
                <li className='h-14'>
                    <NavLink to="/dashboard/all-users">All Users</NavLink>
                </li>
                <li className='h-14'>
                    <NavLink to="/dashboard/all-products">All Products</NavLink>
                </li>
                <li className='h-14'>
                    <NavLink to="/dashboard/all-ads">All Advertisements</NavLink>
                </li>
                <li className='h-14'>
                    <NavLink to="/dashboard/all-orders">All Orders</NavLink>
                </li>
            </>
        }
    </>

    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col lg:bg-base-200">
                    {/* Navbar */}
                    <Navbar />
                    {/* Page content here */}
                    <main className='min-h-screen'>
                        <Outlet />
                    </main>

                    <Footer />
                </div>

                <div className="drawer-side bg-white md:border-r md:border-gray-200">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay bg-white"></label>
                    <div className='p-4'>
                        <Logo />
                    </div>
                    <ul className="menu min-h-80 w-80 p-4 bg-white">
                        {/* Sidebar content here */}
                        {links}
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default Dashboard
