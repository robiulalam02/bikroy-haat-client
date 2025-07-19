import { useQuery } from '@tanstack/react-query';
import React from 'react'
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { MdDone, MdClose, MdEdit, MdDelete } from 'react-icons/md'; // Icons for actions

const AllProducts = () => {
    const { profile: user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {
        isPending,
        isLoading,
        isError,
        error,
        data: products = [],
        refetch
    } = useQuery({
        queryKey: ['allProducts'], // Add filterStatus here if you implement it later
        queryFn: async () => {
            // let url = '/products';
            // if (filterStatus !== 'all') { url += `?status=${filterStatus}`; }
            const res = await axiosSecure.get('/all-products');
            return res.data;
        },
        enabled: !!user, // Ensure user is logged in
        staleTime: 1000 * 60, // 1 minute stale time
    });

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
                                                    // onClick={() => handleApproveReject(product._id, product.status)}
                                                    className="bg-green-400 py-1 px-3 rounded-full text-black font-semibold"
                                                    title={product.status === 'approved' ? 'Mark as Pending' : 'Approve Product'}
                                                // disabled={updateProductStatusMutation.isPending}
                                                >
                                                    approve
                                                </button>
                                                <button
                                                    // onClick={() => handleApproveReject(product._id, product.status)}
                                                    className="bg-red-500 py-1 px-3 rounded-full text-white font-semibold"
                                                    title={product.status === 'approved' ? 'Mark as Pending' : 'Approve Product'}
                                                // disabled={updateProductStatusMutation.isPending}
                                                >
                                                    reject
                                                </button>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                {/* Update Button */}
                                                <button
                                                    // onClick={() => handleUpdateProduct(product._id)}
                                                    className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition duration-200"
                                                    title="Update Product Info"
                                                >
                                                    <MdEdit className="text-lg" />
                                                </button>

                                                {/* Delete Button */}
                                                <button
                                                    // onClick={() => handleDeleteProduct(product._id)}
                                                    className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition duration-200"
                                                    title="Delete Product"
                                                // disabled={deleteProductMutation.isPending}
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
