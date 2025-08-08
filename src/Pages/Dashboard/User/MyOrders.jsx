import React from 'react'
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Components/Loaders/Loading';
import { IoMdEye } from 'react-icons/io';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import ErrorMessage from '../../../Components/Error Page/ErrorMessage';
import { Helmet } from 'react-helmet-async';
import { FcInfo } from "react-icons/fc";


const MyOrders = () => {

    const { profile } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { isPending, isLoading, refetch, error, isError, data: myOrders = [] } = useQuery({
        queryKey: ['myOrders', profile?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders?email=${profile?.email}`);
            return res.data;
        }
    });

    if (isLoading || isPending) {
        return <Loading />
    }

    if (isError || error) {
        return <ErrorMessage />
    }

    return (
        <div className='p-4'>
            <Helmet>
                <title>My Orders</title>
            </Helmet>
            {
                myOrders?.length === 0 ?
                    <div className='flex flex-col items-center justify-center h-screen gap-2'>
                        <h3>You don't have any orders at the moment !!</h3>
                        <button onClick={() => navigate('/all-products')} className='btn btn-primary text-white'>Start Shopping</button>
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
                                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">Order Date</td>
                                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                                        Price
                                        <svg xmlns="http://www.w3.org/2000/svg" className="float-right mt-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                        </svg>
                                    </td>

                                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">Quntity</td>
                                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">Action</td>
                                </tr>
                            </thead>

                            <tbody className="bg-white lg:border-gray-300">
                                {
                                    myOrders?.map(order => (
                                        <tr key={order._id} className="">
                                            <td className="whitespace-no-wrap py-4 text-left text-sm text-gray-600 sm:px-3 lg:text-left">
                                                {order.productName}
                                            </td>

                                            <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">{order.marketName}</td>

                                            <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                                                {new Date(order.date).toLocaleDateString()}
                                            </td>

                                            <td className="whitespace-no-wrap py-4 text-right text-sm text-gray-600 sm:px-3 lg:text-left">
                                                {order.amount} Taka
                                            </td>
                                            <td className="whitespace-no-wrap py-4 text-right text-sm text-gray-600 sm:px-3 lg:text-left">
                                                {
                                                    order.quantity > 9 ?
                                                        `${order.quantity}` :
                                                        `0${order.quantity}`

                                                }
                                            </td>
                                            <td className="whitespace-no-wrap py-4 text-right text-gray-600 sm:px-3 lg:text-left flex items-center justify-center table-cell text-sm md:hidden">
                                                <button onClick={() => navigate(`/product-details/${order.productId}`)} className='text-blue-600'>Details</button>
                                            </td>

                                            <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                                                <div className="flex items-center gap-4">
                                                    {/* Update Button */}
                                                    <button
                                                        onClick={() => navigate(`/product-details/${order.productId}`)}
                                                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition duration-200 text-xs"
                                                    >
                                                        <IoMdEye className="text-lg" />
                                                        Details
                                                    </button>

                                                    {/* Delete Button */}
                                                    <button
                                                        // onClick={onDelete}
                                                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-full shadow-md hover:bg-red-700 transition duration-200 text-xs"
                                                    >
                                                        <FaTrash className="text-cm" />
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

export default MyOrders
