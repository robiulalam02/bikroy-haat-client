import React from 'react'
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Components/Loaders/Loading';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { RiFunctionAddLine } from "react-icons/ri";


const ManageWatchlist = () => {
    const { profile } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { isPending, isLoading, refetch, error, data: watchlists = [] } = useQuery({
        queryKey: ['myWatchlists', profile?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/watchlists?email=${profile?.email}`);
            return res.data;
        }
    });

    if (isLoading || isPending) {
        return <Loading />
    }

    console.log(watchlists)
    return (
        <div className='p-4'>
            <div class="mt-6 overflow-hidden rounded-xl bg-white px-6 shadow lg:px-4">
                <table class="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2">
                    <thead class="hidden border-b lg:table-header-group">
                        <tr class="">
                            <td class="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">
                                Product Name
                                <svg xmlns="http://www.w3.org/2000/svg" class="float-right mt-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                            </td>

                            <td class="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">Market Name</td>
                            <td class="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">Date</td>
                            <td class="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                                Price
                                <svg xmlns="http://www.w3.org/2000/svg" class="float-right mt-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                </svg>
                            </td>

                            <td class="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">Action</td>
                        </tr>
                    </thead>

                    <tbody class="bg-white lg:border-gray-300">
                        {
                            watchlists?.map(product => (
                                <tr class="">
                                    <td class="whitespace-no-wrap py-4 text-left text-sm text-gray-600 sm:px-3 lg:text-left">
                                        {product.itemName}
                                    </td>

                                    <td class="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">{product.marketName}</td>

                                    <td class="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                                        {new Date(product.date).toLocaleDateString()}
                                    </td>

                                    <td class="whitespace-no-wrap py-4 text-right text-sm text-gray-600 sm:px-3 lg:text-left">
                                        {product.pricePerUnit} Taka
                                        <span class="mt-1 ml-auto block w-fit whitespace-nowrap rounded-full bg-purple-100 px-2 py-0.5 text-center text-xs text-purple-800 lg:hidden">Action Required</span>
                                    </td>

                                    <td class="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
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
                                                // onClick={onDelete}
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
        </div>
    )
}

export default ManageWatchlist
