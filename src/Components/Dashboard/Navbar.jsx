import React from 'react'
import useAuth from '../../Hooks/useAuth'
import StyledNavigation from './StyledNavigation';

const Navbar = () => {
    const {profile} = useAuth();
    return (
        <div class="w-full bg-white  border-b border-gray-200 ">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16 items-center">
                    <div className='hidden md:flex'>
                        <StyledNavigation />
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


                    <div class="flex items-center space-x-4">

                        <button class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none relative">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                                <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                            </svg>
                        </button>

                        <div class="relative w-8 h-8">
                            <img class="rounded-full object-cover w-full h-full" src={profile?.photoURL} alt="User Avatar" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
