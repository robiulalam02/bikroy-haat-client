import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'; // Import useState
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { MdDone, MdClose, MdEdit, MdDelete } from 'react-icons/md'; // Icons for actions
import { useNavigate } from 'react-router'; // Changed to react-router-dom
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import ErrorMessage from '../../../Components/Error Page/ErrorMessage';
import { Helmet } from 'react-helmet-async';

const AdminAllProducts = () => {
    const { profile: user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // State to manage the active filter status
    const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'pending', 'approved', 'rejected'

    const {
        isPending,
        isLoading,
        isError,
        error,
        data: paginatedData = [],
        refetch
    } = useQuery({
        queryKey: ['allProducts', filterStatus, itemsPerPage, currentPage], // Include filterStatus in queryKey for re-fetching
        queryFn: async () => {
            let url = `/admin/all-products?page=${currentPage}&limit=${itemsPerPage}`;
            if (filterStatus !== 'all') {
                url += `&status=${filterStatus}`;
            }
            const res = await axiosSecure.get(url);
            return res.data;
        },
        enabled: !!user,
        staleTime: 0,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
    });

    const products = paginatedData.products || [];
    const totalProducts = paginatedData.totalProducts || 0;
    const totalPages = paginatedData.totalPages || 1;


    // Mutation for updating product status (Approve/Reject)
    const updateProductStatusMutation = useMutation({
        mutationFn: async ({ productId, status, rejectionReason = null, feedback = null }) => {
            const res = await axiosSecure.patch(`/products/${productId}/status`, { status, rejectionReason, feedback });
            return res.data;
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['allProducts'] }); // Refetch all products
            toast.success('Product status updated successfully');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to update product status.');
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
            toast.success('Product deleted successfully');
        },
        onError: (error) => {
            console.error('Error deleting product:', error);
            toast.error(error.response?.data?.message || 'Failed to delete product.');
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
                <div class="flex flex-col gap-6 p-6"> <div class="flex flex-col"> <label for="swal-input-reason" class="
            text-gray-700 text-sm font-semibold mb-2 block
            sm:text-base
        ">
            Rejection Reason <span class="text-red-500">*</span>
        </label>
        <input
            type="text"
            id="swal-input-reason"
            class="
                w-full p-3 border border-gray-300 rounded-lg
                text-base text-gray-800
                focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                transition duration-150 ease-in-out
                placeholder-gray-400
            "
            placeholder="e.g., Low quality image, Incomplete description, Prohibited item"
        />
    </div>

    <div class="flex flex-col"> <label for="swal-input-feedback" class="
            text-gray-700 text-sm font-semibold mb-2 block
            sm:text-base
        ">
            Additional Feedback
        </label>
        <textarea
            id="swal-input-feedback"
            rows="4" class="
                w-full p-3 border border-gray-300 rounded-lg
                text-base text-gray-800
                focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                transition duration-150 ease-in-out
                resize-y placeholder-gray-400
            "
            placeholder="e.g., Suggest adding more details about product dimensions or improving product photography."
        ></textarea>
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
            cancelButtonColor: '#6B7280',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProductMutation.mutate(productId);
            }
        });
    };

    // Pagination Handlers
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleItemsPerPageChange = (e) => {
        const items = e.target.value;
        const parsedItems = parseInt(items);
        setItemsPerPage(parsedItems);
        setCurrentPage(1);
    };

    // Loading and Error states
    if (isLoading || isPending) {
        return <div className="text-center py-8">Loading products...</div>;
    }

    if (isError) {
        return <ErrorMessage />
    }

    return (
        <div className="container mx-auto p-4 bg-white h-full">
            <Helmet>
                <title>All Products</title>
            </Helmet>
            <h2 className="text-2xl font-extrabold mb-6 text-gray-800">Manage All Products</h2>

            {/* Filter Buttons */}
            <div className="mb-6 flex space-x-4">
                <button
                    onClick={() => setFilterStatus('all')}
                    className={`px-4 text-sm py-2 rounded-md transition-colors duration-200
                        ${filterStatus === 'all' ? 'bg-primary text-white shadow-md' : 'bg-gray-200 text-black hover:bg-primary hover:text-white'}`}
                >
                    All Products
                </button>
                <button
                    onClick={() => setFilterStatus('pending')}
                    className={`px-4 py-2 text-sm rounded-md transition-colors duration-200
                        ${filterStatus === 'pending' ? 'bg-primary text-white shadow-md' : 'bg-gray-200 text-black hover:bg-primary hover:text-white'}`}
                >
                    Pending
                </button>
                <button
                    onClick={() => setFilterStatus('approved')}
                    className={`px-4 py-2 text-sm rounded-md transition-colors duration-200
                        ${filterStatus === 'approved' ? 'bg-primary text-white shadow-md' : 'bg-gray-200 text-black hover:bg-primary hover:text-white'}`}
                >
                    Approved
                </button>
                <button
                    onClick={() => setFilterStatus('rejected')}
                    className={`px-4 py-2 text-sm rounded-md transition-colors duration-200
                        ${filterStatus === 'rejected' ? 'bg-primary text-white shadow-md' : 'bg-gray-200 text-black hover:bg-primary hover:text-white'}`}
                >
                    Rejected
                </button>
            </div>

            {products.length === 0 ? (
                <p className="text-center text-gray-500 italic text-lg mt-8">
                    No {filterStatus !== 'all' ? filterStatus : ''} products found.
                </p>
            ) : (
                <>
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
                                            <div className="flex items-center justify-center gap-2"> {/* Reduced gap */}
                                                {/* Approve Button */}
                                                {
                                                    product.status !== 'approved' ?
                                                        (
                                                            <button
                                                                onClick={() => handleApproveProduct(product._id)}
                                                                className="bg-green-500 py-1 px-3 rounded-full text-gray-50 font-semibold text-xs hover:bg-green-400 transition"
                                                                title="Approve Product"
                                                                disabled={updateProductStatusMutation.isPending || product.status === 'approved'}
                                                            >
                                                                <MdDone className="inline-block mr-1" /> Approve
                                                            </button>
                                                        ) :
                                                        (
                                                            <button
                                                                disabled
                                                                className="bg-neutral-200 py-1 px-3 rounded-full text-gray-900 font-semibold text-xs"
                                                                title="Approve Product"
                                                            >
                                                                <MdDone className="inline-block mr-1" /> Approved
                                                            </button>
                                                        )
                                                }
                                                {/* Reject Button */}
                                                <button
                                                    onClick={() => handleRejectProduct(product._id)}
                                                    className={`bg-red-500 py-1 px-3 rounded-full text-white font-semibold text-xs hover:bg-red-400 transition ${product.status === 'rejected' && 'opacity-50 cursor-not-allowed'}`}
                                                    title="Reject Product"
                                                    disabled={updateProductStatusMutation.isPending || product.status === 'rejected'}
                                                >
                                                    <MdClose className="inline-block mr-1" /> Reject
                                                </button>

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
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="mt-8 flex justify-between items-center">
                            <select
                                value={itemsPerPage}
                                onChange={handleItemsPerPageChange}
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option value={5}>5 per page</option>
                                <option value={10}>10 per page</option>
                                <option value={20}>20 per page</option>
                                <option value={50}>50 per page</option>
                            </select>

                            <nav className="flex justify-center" aria-label="Pagination">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 mx-1 rounded-md font-medium transition-colors duration-200
                   bg-gray-200 text-gray-700 hover:bg-primary hover:text-white
                   disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                                >
                                    Previous
                                </button>
                                {[...Array(totalPages).keys()].map(page => (
                                    <button
                                        key={page + 1}
                                        onClick={() => handlePageChange(page + 1)}
                                        className={`px-4 py-2 mx-1 rounded-md font-medium transition-colors duration-200
                        ${currentPage === page + 1
                                                ? 'bg-primary text-white shadow-md' // Active state
                                                : 'bg-gray-200 text-gray-700 hover:bg-primary hover:text-white' // Inactive state
                                            }`}
                                    >
                                        {page + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 mx-1 rounded-md font-medium transition-colors duration-200
                   bg-gray-200 text-gray-700 hover:bg-primary hover:text-white
                   disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                                >
                                    Next
                                </button>
                            </nav>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AdminAllProducts;