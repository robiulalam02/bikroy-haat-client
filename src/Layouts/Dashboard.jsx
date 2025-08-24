import React from 'react'
import { NavLink, Outlet, useLocation } from 'react-router'
import Logo from '../Components/Logo/Logo'
import Navbar from '../Components/Dashboard/Navbar'
import Footer from '../Components/Dashboard/Footer'
import Loading from '../Components/Loaders/Loading'
import useAuth from '../Hooks/useAuth'
import useUserRole from '../Hooks/useUserRole'
import { HiOutlineHome, HiOutlineUser, HiOutlineUsers } from 'react-icons/hi2'
import { BsArrowLeftRight, BsBoxSeam, BsClipboard2Check } from 'react-icons/bs'
import { TfiLayoutMediaCenterAlt } from 'react-icons/tfi'
import { TbLayoutGridAdd } from 'react-icons/tb'
import { RiImageAddLine, RiVideoAiLine } from 'react-icons/ri'
import { PiTrendUp } from 'react-icons/pi'
import { IoReceiptOutline } from "react-icons/io5";
import { AnimatePresence, motion } from 'framer-motion';
import { GoArrowLeft } from 'react-icons/go'

const Dashboard = () => {

    const { isVendor, isUser, isAdmin, isLoading } = useUserRole();
    const { profile } = useAuth();
    const location = useLocation();

    // A simple page transition variant
    const pageVariants = {
        initial: { opacity: 0, scale: 0.95 }, // Slight scale in from center
        in: { opacity: 1, scale: 1 },
        out: { opacity: 0, scale: 0.95 }
    };

    const pageTransition = {
        type: "tween",
        ease: "easeInOut",
        duration: 0.3
    };

    const links = <>
        {/* Changed h-14 to h-16 */}
        <li className='hover:text-primary '>
            <NavLink
                to="/"
                className={({ isActive }) =>
                    isActive ? 'bg-base-200 text-black flex items-center px-4  py-3 gap-1' : 'flex items-center px-4 py-3 gap-1'
                }
            >
                <GoArrowLeft className='text-lg' />
                Back Home
            </NavLink>
        </li>
        <li className='hover:bg-base-200 '>
            <NavLink
                to="/dashboard/home"
                className={({ isActive }) =>
                    isActive ? 'bg-base-200 text-black flex items-center px-4  py-3 gap-1' : 'flex items-center px-4 py-3 gap-1'
                }
            >
                <HiOutlineHome className='text-lg' />
                Dashboard
            </NavLink>
        </li>
        <li className='hover:bg-base-200 '>
            <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>
                    isActive ? 'bg-base-200 text-black flex items-center px-4  py-3 gap-1' : 'flex items-center px-4 py-3 gap-1'
                }
            >
                <HiOutlineUser className='text-lg' />
                My Profile
            </NavLink>
        </li>
        {
            isVendor && !isLoading &&
            <>
                <li className='hover:bg-base-200 '>
                    <NavLink
                        to="/dashboard/add-product"
                        className={({ isActive }) =>
                            isActive ? 'bg-base-200 text-black flex items-center px-4  py-3 gap-1' : 'flex items-center px-4 py-3 gap-1'
                        }
                    >
                        <TbLayoutGridAdd className='text-lg' />
                        Add Product
                    </NavLink>
                </li>
                <li className='hover:bg-base-200 '>
                    <NavLink
                        to="/dashboard/my-products"
                        className={({ isActive }) =>
                            isActive ? 'bg-base-200 text-black flex items-center px-4  py-3 gap-1' : 'flex items-center px-4 py-3 gap-1'
                        }
                    >
                        <BsBoxSeam className='' />
                        My Product
                    </NavLink>
                </li>
                <li className='hover:bg-base-200 '>
                    <NavLink
                        to="/dashboard/add-advertisements"
                        className={({ isActive }) =>
                            isActive ? 'bg-base-200 text-black flex items-center px-4  py-3 gap-1' : 'flex items-center px-4 py-3 gap-1'
                        }
                    >
                        <RiImageAddLine className='text-lg' />
                        Add Advertisement
                    </NavLink>
                </li>
                <li className='hover:bg-base-200 '>
                    <NavLink
                        to="/dashboard/my-advertisements"
                        className={({ isActive }) =>
                            isActive ? 'bg-base-200 text-black flex items-center px-4  py-3 gap-1' : 'flex items-center px-4 py-3 gap-1'
                        }
                    >
                        <RiVideoAiLine className='text-lg' />
                        My Advertisement
                    </NavLink>
                </li>
            </>
        }
        {
            isUser && !isLoading &&
            <>
                <li className='hover:bg-base-200 '>
                    <NavLink
                        to="/dashboard/view-price-trends"
                        className={({ isActive }) =>
                            isActive ? 'bg-base-200 text-black flex items-center px-4  py-3 gap-1' : 'flex items-center px-4 py-3 gap-1'
                        }
                    >
                        <PiTrendUp className='text-lg' />
                        View Price Trends
                    </NavLink>
                </li>
                <li className='hover:bg-base-200 '>
                    <NavLink
                        to="/dashboard/manage-watchlist"
                        className={({ isActive }) =>
                            isActive ? 'bg-base-200 text-black flex items-center px-4  py-3 gap-1' : 'flex items-center px-4 py-3 gap-1'
                        }
                    >
                        <BsArrowLeftRight />
                        Manage Watchlist
                    </NavLink>
                </li>
                <li className='hover:bg-base-200 '>
                    <NavLink
                        to="/dashboard/my-orders"
                        className={({ isActive }) =>
                            isActive ? 'bg-base-200 text-black flex items-center px-4  py-3 gap-1' : 'flex items-center px-4 py-3 gap-1'
                        }
                    >
                        <IoReceiptOutline className='' />
                        My Orders
                    </NavLink>
                </li>
            </>
        }
        {
            isAdmin && !isLoading &&
            <>
                <li className='hover:bg-base-200 '>
                    <NavLink
                        to="/dashboard/all-users"
                        className={({ isActive }) =>
                            isActive ? 'bg-base-200 text-black flex items-center px-4 py-3  gap-1' : 'flex items-center px-4 py-3  gap-1'
                        }
                    >
                        <HiOutlineUsers className='text-lg' />
                        All Users
                    </NavLink>
                </li>
                <li className='hover:bg-base-200 '>
                    <NavLink
                        to="/dashboard/all-products"
                        className={({ isActive }) =>
                            isActive ? 'bg-base-200 text-black flex items-center px-4 py-3  gap-1' : 'flex items-center px-4 py-3 gap-1'
                        }
                    >
                        <BsBoxSeam className='' />
                        All Products
                    </NavLink>
                </li>
                <li className='hover:bg-base-200 '>
                    <NavLink
                        to="/dashboard/all-ads"
                        className={({ isActive }) =>
                            isActive ? 'bg-base-200 text-black flex items-center px-4  py-3 gap-1' : 'flex items-center px-4 py-3 gap-1'
                        }
                    >
                        <TfiLayoutMediaCenterAlt className='' />
                        All Advertisements
                    </NavLink>
                </li>
                <li className='hover:bg-base-200 '>
                    <NavLink
                        to="/dashboard/all-orders"
                        className={({ isActive }) =>
                            isActive ? 'bg-base-200 text-black flex items-center px-4 py-3  gap-1' : 'flex items-center px-4 py-3 gap-1'
                        }
                    >
                        <BsClipboard2Check className='' />
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
        <div
            className="page-wrapper" // Add a class for potential styling if needed
        >
            <Navbar />
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col lg:bg-base-200">
                    <motion.main

                        key={location.pathname}
                        variants={pageVariants}
                        initial="initial"
                        animate="in"
                        exit="out"
                        transition={pageTransition}
                        className='min-h-screen'>
                        <Outlet />
                    </motion.main>
                    <Footer />
                </div>

                <div className="drawer-side bg-none lg:bg-white md:border-r md:border-gray-200">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay bg-white"></label>
                    {/* <div className='p-4'>
                        <Logo />
                    </div> */}
                    <ul className="lg:h-80 h-full w-80 flex flex-col bg-white">
                        {/* Sidebar content here */}
                        {links}
                    </ul>
                </div>

            </div>
            
        </div>
    )
}

export default Dashboard