import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import Loading from '../../../Components/Loaders/Loading';
import { FaSearch } from 'react-icons/fa'; // Only FaSearch is used now
import { LuUserCog } from "react-icons/lu";
import Swal from 'sweetalert2';
import ErrorMessage from '../../../Components/Error Page/ErrorMessage';
import { Helmet } from 'react-helmet-async';
// Assuming ErrorPage component exists
// import ErrorPage from '../../../Components/ErrorPage';

const AllUsers = () => {
    const { profile: user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const [filterRole, setFilterRole] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

    // Pagination States
    const [currentPage, setCurrentPage] = useState(1);
    // Add itemsPerPage state and initialize it
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    // State for the modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userToUpdate, setUserToUpdate] = useState(null);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
            setCurrentPage(1);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    useEffect(() => {
        setCurrentPage(1);
    }, [filterRole, itemsPerPage]);

    const {
        isPending,
        isLoading,
        isError,
        error,
        data,
    } = useQuery({
        queryKey: ['allUsers', filterRole, debouncedSearchTerm, currentPage, itemsPerPage],
        queryFn: async () => {
            let url = '/admin/users';
            const queryParams = [];

            if (filterRole && filterRole !== 'all') {
                queryParams.push(`role=${filterRole}`);
            }
            if (debouncedSearchTerm) {
                queryParams.push(`search=${debouncedSearchTerm}`);
            }
            // Add pagination parameters
            queryParams.push(`page=${currentPage}`);
            queryParams.push(`limit=${itemsPerPage}`);

            if (queryParams.length > 0) {
                url += `?${queryParams.join('&')}`;
            }

            const res = await axiosSecure.get(url);
            return res.data;
        },
        enabled: !!user,
        staleTime: 1000 * 60,
    });

    // Update totalPages state whenever new data arrives
    useEffect(() => {
        if (data?.totalPages) {
            setTotalPages(data.totalPages);
        }
    }, [data]);

    // Extract users from the data object, provide a default empty array
    const users = data?.users || [];


    // TanStack Mutation for updating user role (remains the same)
    const updateRoleMutation = useMutation({
        mutationFn: async ({ userId, newRole }) => {
            const res = await axiosSecure.patch(`/admin/update-user-role/${userId}`, { role: newRole });
            return res.data;
        },
        onSuccess: () => {
            // Invalidate the cache for 'allUsers' to refetch fresh data with current pagination/filters
            queryClient.invalidateQueries({ queryKey: ['allUsers', filterRole, debouncedSearchTerm, currentPage, itemsPerPage] });
            setUserToUpdate(null);
            Swal.fire({
                icon: 'success',
                title: 'Role Updated!',
                text: `User role has been successfully updated.`,
                showConfirmButton: false,
                timer: 1500
            });
        },
        onError: (error) => {
            console.error('Error updating role:', error);
            Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: error.response?.data?.message || 'Failed to update user role.',
                confirmButtonText: 'Ok'
            });
        }
    });

    const handleUpdateRoleClick = (userItem) => {
        setUserToUpdate(userItem);
        setIsModalOpen(true);
    };

    const handleRoleSelection = (newRole) => {
        Swal.fire({
            title: "Are you sure you want to update the user role?",
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Confirm",
            confirmButtonColor: "#77af29",
            cancelButtonColor: "#EF4444",
            reverseButtons: true,
            focusConfirm: false,
            focusCancel: true
        })
            .then((result) => {
                if (result.isConfirmed) {
                    updateRoleMutation.mutate({ userId: userToUpdate._id, newRole });
                    setIsModalOpen(false);
                } else {
                    setIsModalOpen(false);
                    setUserToUpdate(null);
                }
            });
    };

    // Pagination handlers
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) { // Ensure page is within valid range
            setCurrentPage(page);
        }
    };

    // New handler for items per page dropdown
    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(parseInt(e.target.value));
        setCurrentPage(1); // Reset to first page when items per page changes
    };

    if (isLoading || isPending) {
        return <Loading />;
    }

    if (isError) {
        // Ensure ErrorPage is imported or handle error display inline
        return <ErrorMessage />
    }

    return (
        <div className='p-4 bg-white h-full'>
            <Helmet>
                <title>All Users</title>
            </Helmet>
            <h2 className="text-2xl font-extrabold mb-6 text-gray-800">Manage All Users</h2>
            {/* Filtering Options */}
            <div className="mb-6 flex flex-wrap gap-3 items-center">
                <button
                    onClick={() => setFilterRole('all')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200
                    ${filterRole === 'all' ? 'bg-primary text-white shadow-md' : 'bg-gray-200 hover:bg-primary hover:text-white'}`}
                >
                    All Roles
                </button>
                <button
                    onClick={() => setFilterRole('user')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                    ${filterRole === 'user' ? 'bg-primary text-white shadow-md' : 'bg-gray-200 hover:bg-primary hover:text-white'}`}
                >
                    Users
                </button>
                <button
                    onClick={() => setFilterRole('vendor')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                    ${filterRole === 'vendor' ? 'bg-primary text-white shadow-md' : 'bg-gray-200 hover:bg-primary hover:text-white'}`}
                >
                    Vendors
                </button>
                <button
                    onClick={() => setFilterRole('admin')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                    ${filterRole === 'admin' ? 'bg-primary text-white shadow-md' : 'bg-gray-200 hover:bg-primary hover:text-white'}`}
                >
                    Admins
                </button>

                <div className="relative w-full md:w-auto flex-grow max-w-sm md:max-w-xs">
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>

                {/* --- Items per page dropdown --- */}
                <div className="flex items-center ml-auto">
                    <label htmlFor="itemsPerPage" className="mr-2 text-sm text-gray-700">Show :</label>
                    <select
                        id="itemsPerPage"
                        className="p-2 border border-gray-200 rounded-lg text-sm text-gray-900 focus:ring-primary focus:border-primary cursor-pointer hover:border-primary"
                        value={itemsPerPage} // Controlled component: value is tied to state
                        onChange={handleItemsPerPageChange} // Call handler on change
                    >
                        <option value="5">5 per page</option>
                        <option value="10">10 per page</option>
                        <option value="20">20 per page</option>
                        <option value="50">50 per page</option>
                    </select>
                </div>
                {/* --- End Items per page dropdown --- */}
            </div>

            {/* Users Table */}
            {users.length === 0 ? (
                <p className="text-center text-gray-500 italic text-lg mt-8">
                    No users found for the selected role{filterRole !== 'all' ? ` "${filterRole}"` : ''} or search term.
                </p>
            ) : (
                <div className="overflow-x-auto border border-gray-200 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 ">
                        <thead className="bg-base-200 h-12">
                            <tr>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    #
                                </th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Role
                                </th>
                                <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((userItem, index) => (
                                <tr key={userItem._id}>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {(currentPage - 1) * itemsPerPage + index + 1}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {userItem.name || 'N/A'}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {userItem.email || 'N/A'}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                            ${userItem.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                                                userItem.role === 'vendor' ? 'bg-green-100 text-green-800' :
                                                    'bg-blue-100 text-blue-800'}`}>
                                            {userItem.role || 'user'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap flex justify-center text-sm font-medium">
                                        <button
                                            onClick={() => handleUpdateRoleClick(userItem)}
                                            className="relative z-0 h-12 rounded-full bg-blue-500 px-6 text-neutral-50 after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-full after:rounded-full after:bg-blue-500 hover:after:scale-x-125 hover:after:scale-y-150 hover:after:opacity-0 hover:after:transition hover:after:duration-500 flex items-center gap-2"
                                        >
                                            <LuUserCog className="text-lg" />
                                            Update Role
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-6">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 mx-1 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    {[...Array(totalPages).keys()].map(page => (
                        <button
                            key={page + 1}
                            onClick={() => handlePageChange(page + 1)}
                            className={`px-4 py-2 mx-1 rounded-lg ${currentPage === page + 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                        >
                            {page + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 mx-1 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            )}


            {/* Update Role Modal (remains the same) */}
            {isModalOpen && userToUpdate && (
                <div className="fixed inset-0 bg-black/40 bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm mx-auto">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                            Update Role for {userToUpdate.name || userToUpdate.email}
                        </h3>
                        <p className="text-gray-600 text-center mb-6">
                            Current Role: <span className="font-semibold capitalize">{userToUpdate.role || 'user'}</span>
                        </p>
                        <div className="flex justify-center gap-4">
                            {userToUpdate.role !== 'vendor' && (
                                <button
                                    onClick={() => handleRoleSelection('vendor')}
                                    className=" h-12 rounded-full relative bg-slate-700 text-white hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600 flex-1"
                                    disabled={updateRoleMutation.isPending}
                                >
                                    <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
                                    <span className="relative z-20">
                                        {updateRoleMutation.isPending ? 'Updating...' : 'Make Vendor'}
                                    </span>
                                </button>
                            )}

                            {userToUpdate.role !== 'admin' && (
                                <button
                                    onClick={() => handleRoleSelection('admin')}
                                    className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 flex-1"
                                    disabled={updateRoleMutation.isPending}
                                >
                                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 font-medium text-white backdrop-blur-3xl">
                                        {updateRoleMutation.isPending ? 'Updating...' : 'Make Admin'}
                                    </span>
                                </button>
                            )}
                        </div>
                        <button
                            onClick={() => {
                                setIsModalOpen(false);
                                setUserToUpdate(null);
                            }}
                            className="mt-6 w-full border border-red-600 hover:bg-red-500 hover:text-white text-red-500 font-bold h-12 rounded-full transition duration-200"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllUsers;