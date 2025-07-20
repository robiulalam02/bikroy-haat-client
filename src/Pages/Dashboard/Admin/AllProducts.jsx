import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { MdDone, MdClose, MdEdit, MdDelete } from 'react-icons/md'; // Icons for actions
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const AllProducts = () => {
    const { profile: user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const {
        isPending,
        isLoading,
        isError,
        error,
        data: products = [],
        refetch
    } = useQuery({
        queryKey: ['allProducts'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-products');
            return res.data;
        },
        enabled: !!user,
        staleTime: 1000 * 60,
    });

    // Mutation for updating product status (Approve/Reject)
    const updateProductStatusMutation = useMutation({
        mutationFn: async ({ productId, status, rejectionReason = null, feedback = null }) => {
            const res = await axiosSecure.patch(`/products/${productId}/status`, { status, rejectionReason });
            return res.data;
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['allProducts'] }); // Refetch all products
            toast.success('product status updated successfully')
        },
        onError: (error) => {
            console.error('Error updating product status:', error);
            toast.error(error.response?.data?.message || 'Failed to update product status.')
        }
    });

    // Mutation for deleting a product
    const deleteProductMutation = useMutation({
        mutationFn: async (productId) => {
            const res = await axiosSecure.delete(`/products/${productId}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allProducts'] }); // Refetch all products
            toast.success('product deleted successfully')
        },
        onError: (error) => {
            console.error('Error deleting product:', error);
            toast.error(error.response?.data?.message || 'Failed to delete product.')
        }
    });

    // Handler for "Approve" action
    const handleApproveProduct = (productId) => {
        Swal.fire({
            title: 'Approve Product?',
            text: `Are you sure you want to approve this product?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#28a745', // Green for Approve
            cancelButtonColor: '#6B7280', // Neutral gray for Cancel
            confirmButtonText: 'Yes, Approve!',
            cancelButtonText: 'No, Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                updateProductStatusMutation.mutate({ productId, status: 'approved' });
            }
        });
    };

    // Updated Handler for "Reject" action with two input fields and improved styling
    const handleRejectProduct = (productId) => {
        Swal.fire({
            title: 'Reject Product',
            html: `
                <div class="flex flex-col gap-4 p-4 -mx-4">
                    <div class="text-left">
                        <label for="swal-input-reason" class="text-gray-700 text-sm font-semibold mb-1 block">Rejection Reason <span class="text-red-500">*</span></label>
                        <input
                            type="text" // <--- Changed from textarea to input type="text"
                            id="swal-input-reason"
                            class="
                                
                                w-full p-3 border border-gray-300 rounded-md
                                text-base text-gray-800
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                transition duration-150 ease-in-out
                            "
                            placeholder="e.g., Low quality image, Incomplete description, Prohibited item"
                        />
                    </div>
                    <div class="text-left">
                        <label for="swal-input-feedback" class="text-gray-700 text-sm font-semibold mb-1 block">Additional Feedback</label>
                        <input
                            type="text" // <--- Changed from textarea to input type="text"
                            id="swal-input-feedback"
                            class="
                                
                                w-full p-3 border border-gray-300 rounded-md
                                text-base text-gray-800
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                transition duration-150 ease-in-out
                            "
                            placeholder="e.g., Suggest adding more details about product dimensions."
                        />
                    </div>
                </div>
            `,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc3545', // Red for Reject
            cancelButtonColor: '#6B7280', // Neutral gray for Cancel
            confirmButtonText: 'Reject Product',
            cancelButtonText: 'Cancel',
            focusConfirm: false,
            preConfirm: () => {
                const reasonInput = Swal.getPopup().querySelector('#swal-input-reason');
                const feedbackInput = Swal.getPopup().querySelector('#swal-input-feedback');

                const rejectionReason = reasonInput.value.trim();
                const feedback = feedbackInput.value.trim();

                if (!rejectionReason) {
                    Swal.showValidationMessage('Rejection Reason is required!');
                    return false;
                }

                return { rejectionReason, feedback };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { rejectionReason, feedback } = result.value;
                updateProductStatusMutation.mutate({ productId, status: 'rejected', rejectionReason, feedback });
            }
        });
    };


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

    console.log(products)
    return (
        <div>
            {products.length === 0 ? (
                <p className="text-center text-gray-500 italic text-lg mt-8">
                    No products found in the system.
                </p>
            ) : (
                <div className="overflow-x-auto border border-gray-200 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    #
                                </th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Image
                                </th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Item Name
                                </th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Vendor Email
                                </th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Market Name
                                </th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Price/Unit
                                </th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {products.map((product, index) => (
                                <tr key={product._id}>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {index + 1}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        {product.image && (
                                            <img src={product.image} alt={product.itemName} className="w-12 h-12 object-cover rounded-md" />
                                        )}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {product.itemName || 'N/A'}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {product.vendorEmail || 'N/A'}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {product.marketName || 'N/A'}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {product.pricePerUnit ? `৳${product.pricePerUnit}` : 'N/A'}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm capitalize">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${product.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                product.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'}`}>
                                            {product.status || 'pending'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-medium">
                                        <div className="flex items-center justify-center gap-6">
                                            <div className="flex items-center gap-2">
                                                {/* Approve/Reject Button */}
                                                <button
                                                    onClick={() => handleApproveProduct(product._id, product.status)}
                                                    className="bg-green-500 py-1 px-3 rounded-full text-gray-50 font-semibold text-xs hover:bg-green-400 transition"
                                                    title={product.status === 'approved' ? 'Mark as Pending' : 'Approve Product'}
                                                    disabled={updateProductStatusMutation.isPending}
                                                >
                                                    approve
                                                </button>
                                                <button
                                                    onClick={() => handleRejectProduct(product._id, product.status)}
                                                    className={`bg-red-500 py-1 px-3 rounded-full text-white font-semibold text-xs hover:bg-red-400 transition ${product.status === 'rejected' && 'cursor-not-allowed'}`}
                                                    title={product.status === 'approved' ? 'Mark as Pending' : 'Approve Product'}
                                                    disabled={updateProductStatusMutation.isPending || product.status === 'rejected'}
                                                >
                                                    reject
                                                </button>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                {/* Update Button */}
                                                <button
                                                    onClick={() => navigate(`/dashboard/update-product/${product._id}`)}
                                                    className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition duration-200"
                                                    title="Update Product Info"
                                                >
                                                    <MdEdit className="text-lg" />
                                                </button>

                                                {/* Delete Button */}
                                                <button
                                                    onClick={() => handleDeleteProduct(product._id)}
                                                    className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition duration-200"
                                                    title="Delete Product"
                                                    disabled={deleteProductMutation.isPending}
                                                >
                                                    <MdDelete className="text-lg" />
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default AllProducts
