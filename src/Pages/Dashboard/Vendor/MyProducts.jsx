import React, { useState } from 'react'
import {
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query'
import useAxiosSecure from '../../../Hooks/useAxiosSecure'
import useAuth from '../../../Hooks/useAuth'
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from 'react-router';
import Loading from '../../../Components/Loaders/Loading';
import { BsInfoCircle } from "react-icons/bs";
import { Tooltip } from 'react-tooltip';
import ShowRejectionTextModal from '../../../Components/Modals/ShowRejectionTextModal';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const MyProducts = () => {

    const { profile } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    let [isOpen, setIsOpen] = useState(false);
    let [selectedFeedback, setSelectedFeedback] = useState(null);

    const { isPending, isLoading, error, data: myProducts = [] } = useQuery({
        queryKey: ['myProucts'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products/vendor?email=${profile?.email}`);
            return res.data;
        }
    });

    // Mutation for deleting a product
    const deleteProductMutation = useMutation({
        mutationFn: async (productId) => {
            const res = await axiosSecure.delete(`/products/${productId}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['myProucts'] }); // Refetch all products
            toast.success('product deleted successfully')
        },
        onError: (error) => {
            console.error('Error deleting product:', error);
            toast.error(error.response?.data?.message || 'Failed to delete product.')
        }
    });

    const handleDeleteProduct = (productId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#6B7280', // Neutral gray for cancel
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProductMutation.mutate(productId);
            }
        });
    };

    const openModal = (feedback) => {
        setIsOpen(true);
        setSelectedFeedback(feedback);
    }

    console.log(myProducts);

    if (isPending || isLoading) {
        return <Loading />
    }

    return (
        <div className='p-4'>
            {
                myProducts?.length > 0 ?
                    <div class="mt-6 overflow-hidden rounded-xl bg-white px-6 shadow lg:px-4">
                        <table class="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2">
                            <thead class="hidden border-b lg:table-header-group">
                                <tr class="">
                                    <td class="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">
                                        Item Name
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

                                    <td class="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">Status</td>
                                    <td class="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">Action</td>
                                </tr>
                            </thead>

                            <tbody class="bg-white lg:border-gray-300">
                                {
                                    myProducts?.map(product => (
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

                                            <td class="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-3 lg:table-cell">
                                                {
                                                    product.status === "pending" &&
                                                    <span class="ml-2 mr-3 whitespace-nowrap rounded-full bg-blue-100 px-2 py-0.5 text-blue-800">Pending</span>
                                                }
                                                {
                                                    product.status === "approved" &&
                                                    <span class="ml-2 mr-3 whitespace-nowrap rounded-full bg-green-100 px-2 py-0.5 text-green-800">Approved</span>
                                                }
                                                {
                                                    product.status === "rejected" && (
                                                        <div className='flex items-center'>
                                                            {/* The 'Rejected' span now directly triggers the tooltip */}
                                                            <span
                                                                className="ml-2 mr-3 whitespace-nowrap rounded-full bg-red-100 px-2 py-0.5 text-red-800" // Changed bg-purple to bg-red for consistency with 'rejected' status
                                                                data-tooltip-id={`rejected-info-tooltip-${product._id}`} // Unique ID for this tooltip
                                                                data-tooltip-html={`
                                                                <strong class="block mb-1 text-lg">Rejection Reason:</strong>
                                                                <p class="text-sm mb-2">${product.rejectionReason || 'N/A'}</p>
                                                                <strong class="block mb-1 text-lg">Feedback:</strong>
                                                                <p class="text-sm">${product.feedback || 'N/A'}</p>
                                                                `} // HTML content for the tooltip
                                                                data-tooltip-place="top" // Position the tooltip above the span
                                                            >
                                                                Rejected
                                                            </span>

                                                            <button onClick={() => openModal(product.feedback || 'N/A')} className='text-lg text-black hover:text-blue-500 transition'>
                                                                <BsInfoCircle />
                                                            </button>

                                                            {/* The Tooltip component itself, linked by ID */}
                                                            <Tooltip
                                                                id={`rejected-info-tooltip-${product._id}`}
                                                                style={{ backgroundColor: '#333', color: '#fff', maxWidth: '300px', borderRadius: '8px', padding: '10px' }}
                                                            />
                                                        </div>
                                                    )
                                                }
                                            </td>
                                            <td class="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                                                <div className="flex items-center gap-4">
                                                    {/* Update Button */}
                                                    <button
                                                        onClick={() => navigate(`/dashboard/update-product/${product._id}`)}
                                                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition duration-200 text-xs"
                                                    >
                                                        <FaEdit className="text-sm" />
                                                        Update
                                                    </button>

                                                    {/* Delete Button */}
                                                    <button
                                                        onClick={() => handleDeleteProduct(product._id)}
                                                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-full shadow-md hover:bg-red-700 transition duration-200 text-xs"
                                                    >
                                                        <FaTrash className="text-sm" />
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    :
                    <div className='flex flex-col items-center justify-center h-screen gap-2'>
                        <h3>You doesn't added any products yet !!</h3>
                        <button onClick={() => navigate('/dashboard/add-product')} className='btn btn-primary text-white'>Add Product</button>
                    </div>
            }
            <ShowRejectionTextModal setIsOpen={setIsOpen} selectedFeedback={selectedFeedback} isOpen={isOpen} />
        </div>
    )
}

export default MyProducts
