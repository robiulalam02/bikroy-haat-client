import React from 'react'
import { Outlet } from 'react-router'
import Logo from '../Components/Logo/Logo'
import Navbar from '../Pages/Shared/Navbar'

const Dashboard = () => {
    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col lg:bg-base-200">
                    {/* Navbar */}
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
                                        <img class="rounded-full object-cover w-full h-full" src="https://i.pravatar.cc/40?img=3" alt="User Avatar" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Page content here */}
                    <main className='min-h-screen'>
                        <Outlet />
                    </main>

                    <footer class="bg-white shadow sm:flex sm:items-center sm:justify-between p-4 sm:p-6 xl:p-8 antialiased">
                        <p class="mb-4 text-sm text-center text-gray-500  sm:mb-0">
                            &copy; 2019-2022 <a href="https://flowbite.com/" class="hover:underline" target="_blank">Flowbite.com</a>. All rights reserved.
                        </p>
                        <div class="flex justify-center items-center space-x-1">
                            <a href="#" data-tooltip-target="tooltip-facebook" class="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer  dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600">
                                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                                    <path fill-rule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clip-rule="evenodd" />
                                </svg>
                                <span class="sr-only">Facebook</span>
                            </a>
                            <div id="tooltip-facebook" role="tooltip" class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
                                Like us on Facebook
                                <div class="tooltip-arrow" data-popper-arrow></div>
                            </div>
                            <a href="#" data-tooltip-target="tooltip-twitter" class="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer dark:text-gray-400 dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600">
                                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path fill="currentColor" d="M12.186 8.672 18.743.947h-2.927l-5.005 5.9-4.44-5.9H0l7.434 9.876-6.986 8.23h2.927l5.434-6.4 4.82 6.4H20L12.186 8.672Zm-2.267 2.671L8.544 9.515 3.2 2.42h2.2l4.312 5.719 1.375 1.828 5.731 7.613h-2.2l-4.699-6.237Z" />
                                </svg>
                                <span class="sr-only">Twitter</span>
                            </a>
                            <div id="tooltip-twitter" role="tooltip" class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
                                Follow us on Twitter
                                <div class="tooltip-arrow" data-popper-arrow></div>
                            </div>
                            <a href="#" data-tooltip-target="tooltip-github" class="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer dark:text-gray-400 dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600">
                                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clip-rule="evenodd" />
                                </svg>
                                <span class="sr-only">Github</span>
                            </a>
                            <div id="tooltip-github" role="tooltip" class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
                                Star us on GitHub
                                <div class="tooltip-arrow" data-popper-arrow></div>
                            </div>
                            <a href="#" data-tooltip-target="tooltip-dribbble" class="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer dark:text-gray-400 dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600">
                                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 0a10 10 0 1 0 10 10A10.009 10.009 0 0 0 10 0Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.094 20.094 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM8 1.707a8.821 8.821 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.758 45.758 0 0 0 8 1.707ZM1.642 8.262a8.57 8.57 0 0 1 4.73-5.981A53.998 53.998 0 0 1 9.54 7.222a32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.64 31.64 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM10 18.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 13.113 11a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z" clip-rule="evenodd" />
                                </svg>
                                <span class="sr-only">Dribbble</span>
                            </a>
                            <div id="tooltip-dribbble" role="tooltip" class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
                                Follow us on Dribbble
                                <div class="tooltip-arrow" data-popper-arrow></div>
                            </div>
                        </div>
                    </footer>
                </div>



                <div className="drawer-side bg-white md:border-r md:border-gray-200">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay bg-white"></label>
                    <ul className="menu text-base-content min-h-full w-80 p-4 bg-white">
                        {/* Sidebar content here */}
                        <li>
                            <Logo />
                        </li>
                        <li>Home</li>
                        <li>Add Product</li>
                        <li>My Product</li>
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default Dashboard
