import React, { useContext, useState } from 'react';
import Logo from '../../Components/Logo/Logo';
import { NavLink, useNavigate } from 'react-router'; // Corrected import to react-router-dom for consistency
import { AuthContext } from '../../Providers/AuthContext';

const Navbar = () => {
    const { profile, userSignOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State to manage Flowbite drawer visibility

    // Your original links for both desktop and sidebar
    const links = (
        <>
            <li>
                <NavLink
                    className={({ isActive }) =>
                        isActive ? 'bg-black/10 px-2 py-1 rounded' : 'px-2 py-1 rounded'
                    }
                    to="/">Home</NavLink>
            </li>
            <li>
                <NavLink
                    className={({ isActive }) =>
                        isActive ? 'bg-black/10 px-2 py-1 rounded' : 'px-2 py-1 rounded'
                    }
                    to="/all-products">All Products</NavLink>
            </li>
            <li>
                <NavLink
                    className={({ isActive }) =>
                        isActive ? 'bg-black/10 px-2 py-1 rounded' : 'px-2 py-1 rounded'
                    }
                    to="/about-us">About us</NavLink>
            </li>
            {profile && (
                <li>
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? 'bg-black/10 px-2 py-1 rounded' : 'px-2 py-1 rounded'
                        }
                        to="/dashboard/profile">Dashboard</NavLink>
                </li>
            )}
            {
                !profile ?
                    <>
                        <li className="block lg:hidden">
                            <NavLink to="/login">Login</NavLink>
                        </li>
                        <li className="block lg:hidden">
                            <NavLink to="/register">Register</NavLink>
                        </li>
                    </>
                    :
                    <li className="block lg:hidden">
                        <button className='w-full' onClick={userSignOut}>Logout</button>
                    </li>

            }
        </>
    );

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const handleLinkClick = () => {
        // Close the drawer when a link is clicked inside the sidebar
        setIsDrawerOpen(false);
    };

    return (
        <nav className='bg-gradient-to-r from-base-200 via-[#d8ffa1] to-base-100 shadow-sm w-full'>
            {/* Main Navbar Content */}
            <div className="navbar flex items-center justify-between max-w-screen-2xl mx-auto px-4">
                <div className="flex-none lg:hidden">
                    {/* Drawer toggle button for small screens */}
                    <button
                        onClick={toggleDrawer}
                        aria-label="open sidebar"
                        className="btn btn-square btn-ghost"
                    >
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
                    </button>
                </div>

                {/* Logo for both small and large screens */}
                <div className="px-2 mx-2">
                    <Logo />
                </div>

                {/* Navbar menu content for large screens */}
                <div className="hidden lg:block">
                    <ul className="flex items-center gap-3 text-sm px-1">
                        {links}
                    </ul>
                </div>

                {/* Login/Logout buttons on the right */}
                <div className="hidden lg:flex">
                    {profile ? (
                        <div className="flex items-center gap-4">
                            <button onClick={() => navigate('/dashboard/profile')} className="relative w-8 h-8">
                                <img className="rounded-full object-cover w-full h-full" src={profile?.photoURL} alt="User Avatar" />
                            </button>
                            <button onClick={userSignOut} className='btn btn-primary text-white'>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <button onClick={() => navigate('/login')} className='btn btn-primary text-white'>
                                Login
                            </button>
                            <button onClick={() => navigate('/register')} className='btn border border-primary bg-transparent text-primary hover:bg-primary hover:text-white transition'>
                                Register
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Flowbite Drawer Component for small screens */}
            <div
                id="drawer-example"
                className={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'} bg-primary w-80 `}
                tabIndex="-1"
                aria-labelledby="drawer-label"
            >
                <button
                    type="button"
                    onClick={toggleDrawer} // Use toggleDrawer to close
                    aria-controls="drawer-example"
                    className="text-white bg-transparent  rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                </button>

                {/* Sidebar Navigation Links (your original 'links') */}
                <ul className="menu text-white w-full p-0"> {/* Adjusted styling for Flowbite context */}
                    {React.Children.map(links, (link) =>
                        React.cloneElement(link, {
                            onClick: handleLinkClick, // Close drawer on link click
                        })
                    )}
                </ul>

            </div>

            {/* Optional: Overlay to close drawer when clicking outside */}
            {isDrawerOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden" // z-30 is less than drawer's z-40
                    onClick={toggleDrawer}
                    aria-hidden="true"
                ></div>
            )}
        </nav>
    );
};

export default Navbar;