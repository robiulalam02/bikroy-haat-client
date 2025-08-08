import React, { useState } from 'react'
import useAuth from '../../Hooks/useAuth'
import StyledNavigation from './StyledNavigation';
import Logo from '../Logo/Logo';
import { Button, Dialog, DialogPanel } from '@headlessui/react';

const Navbar = () => {
    const { profile, userSignOut } = useAuth();
    let [isOpen, setIsOpen] = useState(false)

    function open() {
        setIsOpen(true)
    }

    function close() {
        setIsOpen(false)
    }

    const handleLogoutBtn = () => {
        userSignOut();
        close();
    }

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

                        <button onClick={open} className="relative w-8 h-8">
                            <img className="rounded-full object-cover w-full h-full" src={profile?.photoURL} alt="User Avatar" />
                        </button>
                    </div>
                </div>
            </div>
            
            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
                <div className="fixed inset-0 z-10 right-0 w-screen overflow-y-auto">
                    <div className="flex absolute right-0 top-10 items-center max-w-md justify-end p-4">
                        <DialogPanel
                            transition
                            className="w-full rounded-xl bg-base-200 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                        >
                            <div className="mt-4">
                                <Button
                                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                                    onClick={handleLogoutBtn}
                                >
                                    Logout
                                </Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default Navbar
