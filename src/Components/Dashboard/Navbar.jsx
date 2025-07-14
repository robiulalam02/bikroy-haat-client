import React from 'react'
import useAuth from '../../Hooks/useAuth'

const Navbar = () => {
    const {profile} = useAuth();
    return (
        <div class="w-full bg-white  border-b border-gray-200 ">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16 items-center">
                    {/* <!-- Left side (empty or you can add logo/text) --> */}
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

                        <button id="theme-toggle" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none">
                            <svg id="theme-toggle-light-icon" class="w-5 h-5 hidden" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 2a.75.75 0 01.75.75V4a.75.75 0 01-1.5 0V2.75A.75.75 0 0110 2zm5.657 2.343a.75.75 0 011.06 1.06l-1.061 1.061a.75.75 0 11-1.06-1.06l1.06-1.061zM16 10a.75.75 0 010 1.5h-1.25a.75.75 0 010-1.5H16zM4 10a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H4zm1.343-5.657a.75.75 0 011.06 0l1.061 1.06a.75.75 0 11-1.06 1.061L5.343 5.343a.75.75 0 010-1.06zM10 16a.75.75 0 01.75.75V18a.75.75 0 01-1.5 0v-1.25A.75.75 0 0110 16zm4.657-1.657a.75.75 0 011.06 1.06l-1.061 1.061a.75.75 0 11-1.06-1.06l1.06-1.061zM5.343 14.657a.75.75 0 011.06 0l1.061 1.06a.75.75 0 11-1.06 1.061l-1.061-1.06a.75.75 0 010-1.061z"></path>
                            </svg>
                            <svg id="theme-toggle-dark-icon" class="w-5 h-5 hidden" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M17.293 13.293A8 8 0 116.707 2.707 9 9 0 0017.293 13.293z"></path>
                            </svg>
                        </button>

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
