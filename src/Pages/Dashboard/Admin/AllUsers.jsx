import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure'
import useAuth from '../../../Hooks/useAuth'
import Loading from '../../../Components/Loaders/Loading'
import { FaEdit, FaSearch } from 'react-icons/fa';
import { LuUserCog } from "react-icons/lu";
import Swal from 'sweetalert2';


const AllUsers = () => {
    const { profile: user } = useAuth(); // Assuming 'user' object or 'profile' helps identify admin
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient(); // Get query client for invalidation

    // State to manage the selected role filter: 'all', 'user', 'vendor', 'admin'
    const [filterRole, setFilterRole] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(''); // State for debounced search term

    // State for the modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userToUpdate, setUserToUpdate] = useState(null); // Stores the user object whose role we want to change

    // Debounce effect for search input
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500); // 500ms delay

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]); // Only re-run if searchTerm changes

    const {
        isPending,
        isLoading,
        isError,
        error,
        data: users = [], // Data will be an array of user objects
        refetch // To refetch data when filter changes
    } = useQuery({
        // queryKey changes when filterRole changes, triggering a re-fetch
        queryKey: ['allUsers', filterRole, debouncedSearchTerm],
        queryFn: async () => {
            let url = '/users';
            const queryParams = [];

            if (filterRole && filterRole !== 'all') {
                queryParams.push(`role=${filterRole}`);
            }
            if (debouncedSearchTerm) { // Use debouncedSearchTerm for API calls
                queryParams.push(`search=${debouncedSearchTerm}`);
            }

            if (queryParams.length > 0) {
                url += `?${queryParams.join('&')}`;
            }

            // Assuming axiosSecure base URL points to your backend (e.g., /api)
            const res = await axiosSecure.get(url);
            return res.data;
        },
        // Only fetch if the user is authenticated and potentially an admin (add admin check if needed)
        enabled: !!user, // Assuming user being logged in is enough for now
        staleTime: 1000 * 60, // Data remains fresh for 1 minute
    });

    // TanStack Mutation for updating user role
    const updateRoleMutation = useMutation({
        mutationFn: async ({ userId, newRole }) => {
            // Assuming your backend update role API is PUT or PATCH /users/:id
            const res = await axiosSecure.patch(`/users/${userId}`, { role: newRole });
            return res.data;
        },
        onSuccess: () => {
            // Invalidate the cache for 'allUsers' to refetch fresh data
            queryClient.invalidateQueries({ queryKey: ['allUsers'] });
            setIsModalOpen(false); // Close the modal
            setUserToUpdate(null); // Clear the user to update
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

    // Function to open the modal
    const handleUpdateRoleClick = (userItem) => {
        setUserToUpdate(userItem);
        setIsModalOpen(true);
    };

    const handleRoleSelection = (newRole) => {
        Swal.fire({
            title: "Are you sure want to update the user role?",
            type: "info",
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
                    // If user confirms, proceed with the mutation
                    updateRoleMutation.mutate({ userId: userToUpdate._id, newRole });
                } else {
                    // If user cancels, close the modal without updating
                    setIsModalOpen(false);
                    setUserToUpdate(null);
                }
            });
    };

    if (isLoading || isPending) {
        return <Loading />;
    }

    if (isError) {
        // Pass the error object to your ErrorPage component
        return <ErrorPage errorMessage={error?.message || "Failed to load users."} />;
    }
    return (
        <div className='p-4 bg-white h-full'>
            {/* Filtering Options */}
            <div className="mb-6 flex flex-wrap gap-3 justify-center">
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
            </div>

            {/* Users Table */}
            {users.length === 0 ? (
                <p className="text-center text-gray-500 italic text-lg mt-8">
                    No users found for the selected role{filterRole !== 'all' ? ` "${filterRole}"` : ''}.
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
                            {users.map((userItem, index) => ( // Renamed 'user' to 'userItem' to avoid conflict with useAuth 'user'
                                <tr key={userItem._id}>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {index + 1}
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
                                        {/* Placeholder for Update Role Button */}
                                        <button
                                            onClick={() => handleUpdateRoleClick(userItem)}
                                            className="relative z-0 h-12 rounded-full bg-blue-500 px-6 text-neutral-50 after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-full after:rounded-full after:bg-blue-500 hover:after:scale-x-125 hover:after:scale-y-150 hover:after:opacity-0 hover:after:transition hover:after:duration-500 flex items-center gap-2"
                                        >
                                            <LuUserCog className="text-lg" />
                                            Update Role
                                        </button>
                                        {/* Placeholder for Delete User Button (e.g., if needed by admin) */}
                                        {/* <button
                      className="text-red-600 hover:text-red-900"
                      // onClick={() => handleDeleteUser(userItem._id)}
                    >
                      Delete
                    </button> */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Update Role Modal */}
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
                                    className=" h-12 rounded-full relative bg-slate-700 text-white hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600 flex-1" // Added flex-1
                                    disabled={updateRoleMutation.isPending}
                                >
                                    <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
                                    <span className="relative z-20">
                                        {updateRoleMutation.isPending ? 'Updating...' : 'Make Vendor'}
                                    </span>
                                </button>
                            )}

                            {userToUpdate.role !== 'admin' && ( // Don't show "Make Admin" if already admin
                                <button
                                    onClick={() => handleRoleSelection('admin')}
                                    className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 flex-1" // Added flex-1 for consistent sizing
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
    )
}

export default AllUsers
