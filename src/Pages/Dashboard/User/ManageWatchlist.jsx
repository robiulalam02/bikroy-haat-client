import React from 'react'
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Loading from '../../../Components/Loaders/Loading';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { RiFunctionAddLine } from "react-icons/ri";
import Swal from 'sweetalert2';
import ErrorMessage from '../../../Components/Error Page/ErrorMessage';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet-async';


const ManageWatchlist = () => {
    const { profile } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { isPending, isLoading, refetch, error, isError, data: watchlists = [] } = useQuery({
        queryKey: ['myWatchlists', profile?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/watchlists?email=${profile?.email}`);
            return res.data;
        },
        enabled: !!profile?.email,
        // staleTime: 1000 * 60 * 5,
    });

    // Mutation for deleting a product
    const deleteWatchlistMutation = useMutation({
        mutationFn: async (productId) => {
            const res = await axiosSecure.delete(`/watchlists/${productId}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['myWatchlists'] }); // Refetch all products
            toast.success('Product removed from watchlist');
        },
        onError: (error) => {
            console.error('Error removing product:', error);
            toast.error(error.response?.data?.message || 'Failed to remove product.');
        }
    });

    const handleDeleteWatchlist = (productId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#6B7280',
            confirmButtonText: 'Yes, remove it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteWatchlistMutation.mutate(productId);
            }
        });
    };

    if (isLoading || isPending) {
        return <Loading />
    }

    if (error || isError) {
        return <ErrorMessage />
    }

    return (
        <div className='p-4'>
            <Helmet>
                <title>Manage Watchlist</title>
            </Helmet>
            {
                watchlists?.length === 0 || !watchlists ?
                    <div className='flex flex-col items-center justify-center h-screen gap-2'>
                        <h3>There is no product in your watchlist !!</h3>
                        <button onClick={() => navigate('/all-products')} className='btn btn-primary text-white'>Click to Add</button>
                    </div>
                    :
                    <div className="mt-6 overflow-hidden rounded-xl bg-white px-6 shadow lg:px-4">
                        <table className="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2">
                            <thead className="hidden border-b lg:table-header-group">
                                <tr className="">
                                    <td className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">
                                        Product Name
                                        <svg xmlns="http://www.w3.org/2000/svg" className="float-right mt-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                        </svg>
                                    </td>

                                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">Market Name</td>
                                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">Date</td>
                                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                                        Price
                                        <svg xmlns="http://www.w3.org/2000/svg" className="float-right mt-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                        </svg>
                                    </td>

                                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">Action</td>
                                </tr>
                            </thead>

                            <tbody className="bg-white lg:border-gray-300">
                                {
                                    watchlists?.map(product => (
                                        <tr className="">
                                            <td className="whitespace-no-wrap py-4 text-left text-sm text-gray-600 sm:px-3 lg:text-left">
                                                {product.itemName}
                                            </td>

                                            <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">{product.marketName}</td>

                                            <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                                                {new Date(product.date).toLocaleDateString()}
                                            </td>

                                            <td className="whitespace-no-wrap py-4 text-right text-sm text-gray-600 sm:px-3 lg:text-left">
                                                {product.pricePerUnit} Taka
                                                <span className="mt-1 ml-auto block w-fit whitespace-nowrap rounded-full bg-purple-100 px-2 py-0.5 text-center text-xs text-purple-800 lg:hidden">Action Required</span>
                                            </td>

                                            <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                                                <div className="flex items-center gap-4">
                                                    {/* Update Button */}
                                                    <button
                                                        onClick={() => navigate(`/dashboard/update-product/${product._id}`)}
                                                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition duration-200 text-xs"
                                                    >
                                                        <RiFunctionAddLine className="text-lg" />
                                                        Add More
                                                    </button>

                                                    {/* Delete Button */}
                                                    <button
                                                        onClick={() => handleDeleteWatchlist(product._id)}
                                                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-full shadow-md hover:bg-red-700 transition duration-200 text-xs"
                                                    >
                                                        <FaTrash className="text-sm" />
                                                        Remove
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
            }
        </div>
    )
}

export default ManageWatchlist
