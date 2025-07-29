import React from 'react'
import useAuth from '../../Hooks/useAuth'
import StyledNavigation from './StyledNavigation';
import Logo from '../Logo/Logo';

const Navbar = () => {
    const { profile } = useAuth();
    return (
        <div className="w-full bg-white  border-b border-gray-200 ">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="hidden lg:flex">
                        <Logo />
                    </div>
                    <div>
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>


                    <div className="flex items-center space-x-4">
                        <div className='hidden lg:flex'>
                            <StyledNavigation />
                        </div>

                        <div className="relative w-8 h-8">
                            <img className="rounded-full object-cover w-full h-full" src={profile?.photoURL} alt="User Avatar" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
