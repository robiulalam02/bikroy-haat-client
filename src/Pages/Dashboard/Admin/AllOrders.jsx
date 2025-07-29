import React from 'react'
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Components/Loaders/Loading';
import moment from 'moment';
import ErrorMessage from '../../../Components/Error Page/ErrorMessage';
import { Helmet } from 'react-helmet-async';

const AllOrders = () => {
    const { profile } = useAuth(); // Assuming profile contains user role/email
    const axiosSecure = useAxiosSecure();

    // Fetch All Orders
    const {
        isPending,
        isLoading,
        isError,
        error,
        data: orders = [],
        refetch
    } = useQuery({
        queryKey: ['allOrders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allOrders');
            return res.data;
        },
        // enabled: !!profile?.isAdmin
    });

    if (isLoading || isPending) {
        return <Loading />;
    }

    if (isError || error) {
        return <ErrorMessage />
    }

    return (
        <div className="p-4 bg-white h-full overflow-x-auto">
            <Helmet>
                <title>All Orders</title>
            </Helmet>
            <h1 className="text-2xl font-extrabold text-gray-800 mb-6 text-center">
                All Orders
            </h1>

            {orders.length === 0 ? (
                <p className="text-center text-gray-500 italic text-lg mt-8">
                    No orders found.
                </p>
            ) : (
                <div className="overflow-x-auto border border-gray-200 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Email</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market Name</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {orders.map((order, index) => (
                                <tr key={order._id}>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.orderId || 'N/A'}</td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{order.date ? moment(order.date).format('YYYY-MM-DD') : 'N/A'}</td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{order.userEmail || 'N/A'}</td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{order.fullName || 'N/A'}</td>
                                    <td className="px-4 py-4 text-sm font-medium text-gray-900 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap" title={order.productName}>{order.productName || 'N/A'}</td>
                                    <td className="px-4 py-4 text-sm text-gray-900 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap" title={order.marketName}>{order.marketName || 'N/A'}</td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-center text-gray-900">{order.quantity?.$numberInt || order.quantity || 'N/A'}</td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{order.amount?.$numberInt ? `৳${order.amount.$numberInt}` : (order.amount ? `৳${order.amount}` : 'N/A')}</td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm capitalize">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                          ${order.paymentStatus === 'succeess' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {order.paymentStatus || 'N/A'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm capitalize">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                          ${order.status === 'succeeded' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {order.status || 'N/A'}
                                        </span>
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

export default AllOrders
