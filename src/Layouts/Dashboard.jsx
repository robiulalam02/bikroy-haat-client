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
    const {profile} = useAuth();
    console.log(isVendor)

    const links = <>
        {/* Changed h-14 to h-16 */}
        <li className='hover:bg-base-200 rounded-full'>
            <NavLink
                to="/dashboard/home"
                className={({ isActive }) =>
                    isActive ? 'bg-base-200 text-black flex items-center px-4 rounded-full py-3' : 'flex items-center px-4 py-3'
                }
            >
                Home
            </NavLink>
        </li>
        {
            isVendor && !isLoading &&
            <>
                <li className='hover:bg-base-200 rounded-full'>
                    <NavLink
                        to="/dashboard/add-product"
                        className={({ isActive }) =>
                            isActive ? 'bg-base-200 text-black flex items-center px-4 rounded-full py-3' : 'flex items-center px-4 py-3'
                        }
                    >
                        Add Product
                    </NavLink>
                </li>
                <li className='hover:bg-base-200 rounded-full'>
                    <NavLink
                        to="/dashboard/my-products"
                        className={({ isActive }) =>
                            isActive ? 'bg-base-200 text-black flex items-center px-4 rounded-full py-3' : 'flex items-center px-4 py-3'
                        }
                    >
                        My Product
                    </NavLink>
                </li>
                <li className='hover:bg-base-200 rounded-full'>
                    <NavLink
                        to="/dashboard/add-advertisements"
                        className={({ isActive }) =>
                            isActive ? 'bg-base-200 text-black flex items-center px-4 rounded-full py-3' : 'flex items-center px-4 py-3'
                        }
                    >
                        Add Advertisement
                    </NavLink>
                </li>
                <li className='hover:bg-base-200 rounded-full'>
                    <NavLink
                        to="/dashboard/my-advertisements"
                        className={({ isActive }) =>
                            isActive ? 'bg-base-200 text-black flex items-center px-4 rounded-full py-3' : 'flex items-center px-4 py-3'
                        }
                    >
                        My Advertisement
                    </NavLink>
                </li>
            </>
        }
        {
            isUser && !isLoading &&
            <>
                <li className='hover:bg-base-200 rounded-full'>
                    <NavLink
                        to="/dashboard/view-price-trends"
                        className={({ isActive }) =>
                            isActive ? 'bg-base-200 text-black flex items-center px-4 rounded-full py-3' : 'flex items-center px-4 py-3'
                        }
                    >
                        View Price Trends
                    </NavLink>
                </li>
                <li className='hover:bg-base-200 rounded-full'>
                    <NavLink
                        to="/dashboard/manage-watchlist"
                        className={({ isActive }) =>
                            isActive ? 'bg-base-200 text-black flex items-center px-4 rounded-full py-3' : 'flex items-center px-4 py-3'
                        }
                    >
                        Manage Watchlist
                    </NavLink>
                </li>
                <li className='hover:bg-base-200 rounded-full'>
                    <NavLink
                        to="/dashboard/my-orders"
                        className={({ isActive }) =>
                            isActive ? 'bg-base-200 text-black flex items-center px-4 rounded-full py-3' : 'flex items-center px-4 py-3'
                        }
                    >
                        My Orders
                    </NavLink>
                </li>
            </>
        }
        {
            isAdmin && !isLoading &&
            <>
                <li className='hover:bg-base-200 rounded-full'>
                    <NavLink
                        to="/dashboard/all-users"
                        className={({ isActive }) =>
                            isActive ? 'bg-base-200 text-black flex items-center px-4 py-3 rounded-full' : 'flex items-center px-4 py-3 rounded-full'
                        }
                    >
                        All Users
                    </NavLink>
                </li>
                <li className='hover:bg-base-200 rounded-full'>
                    <NavLink
                        to="/dashboard/all-products"
                        className={({ isActive }) =>
                            isActive ? 'bg-base-200 text-black flex items-center px-4 py-3 rounded-full' : 'flex items-center px-4 py-3'
                        }
                    >
                        All Products
                    </NavLink>
                </li>
                <li className='hover:bg-base-200 rounded-full'>
                    <NavLink
                        to="/dashboard/all-ads"
                        className={({ isActive }) =>
                            isActive ? 'bg-base-200 text-black flex items-center px-4 rounded-full py-3 ' : 'flex items-center px-4 py-3'
                        }
                    >
                        All Advertisements
                    </NavLink>
                </li>
                <li className='hover:bg-base-200 rounded-full'>
                    <NavLink
                        to="/dashboard/all-orders"
                        className={({ isActive }) =>
                            isActive ? 'bg-base-200 text-black flex items-center px-4 py-3 rounded-full' : 'flex items-center px-4 py-3'
                        }
                    >
                        All Orders
                    </NavLink>
                </li>
            </>
        }
    </>

    if (!profile) {
        return <Loading />
    }

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

                <div className="drawer-side bg-none md:bg-white md:border-r md:border-gray-200">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay bg-white"></label>
                    <div className='p-4'>
                        <Logo />
                    </div>
                    <ul className="md:h-80 h-full w-80 p-4 flex flex-col bg-white">
                        {/* Sidebar content here */}
                        {links}
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default Dashboard