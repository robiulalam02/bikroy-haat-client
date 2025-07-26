import React, { useContext } from 'react'
import Logo from '../../Components/Logo/Logo'
import { NavLink, useNavigate } from 'react-router'
import { AuthContext } from '../../Providers/AuthContext'

const Navbar = () => {

    const { profile, userSignOut } = useContext(AuthContext);
    const navigate = useNavigate();

    console.log(profile);

    const links = <>
        <li>
            <NavLink to="/">Home</NavLink>
        </li>
        <li>
            <NavLink to="/all-products">All Products</NavLink>
        </li>
        <li>
            <NavLink to="/about-us">About us</NavLink>
        </li>
        {
            profile &&
            <li>
                <NavLink to="/dashboard/home">Dashboard</NavLink>
            </li>
        }
    </>

    return (
        <div className=" bg-gradient-to-r from-base-200 via-[#d8ffa1] to-base-100 shadow-sm">
            <div className="max-w-screen-2xl mx-auto navbar">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li><a>Item 1</a></li>
                            <li>
                                <a>Parent</a>
                                <ul className="p-2">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </li>
                            <li><a>Item 3</a></li>
                        </ul>
                    </div>
                    <Logo />
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {
                            links
                        }
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        profile ?
                            <button onClick={userSignOut} className='btn btn-primary text-white'>
                                Logout
                            </button>
                            :
                            <div className="flex items-center gap-2">
                                <button onClick={() => navigate('/login')} className='btn btn-primary text-white'>
                                    Login
                                </button>
                                <button onClick={() => navigate('/register')} className='btn border border-primary bg-transparent text-primary hover:bg-primary hover:text-white transition'>
                                    Register
                                </button>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar
