import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react'
import CheckoutForm from './CheckoutForm';
import { useLocation, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loading from '../../Components/Loaders/Loading';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PAYMENT_SECRET);

const Payment = () => {
    const { id } = useParams();
    const location = useLocation();
    const { totalPrice, quantity } = location.state || {};

    const axiosSecure = useAxiosSecure();

    const { isPending, isLoading, error, data: product } = useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products/${id}`);
            return res.data;
        }
    })

    return (
        <div className='max-w-screen-xl mx-auto flex flex-col-reverse lg:flex-row mb-20 items-center px-4 md:px-0'>
            <div className='w-full md:w-6/12'>
                <Elements stripe={stripePromise} >
                    <CheckoutForm price={totalPrice} quantity={quantity} product={product} />
                </Elements>
            </div>
            <div className="p-6 border bg-base-100 border-gray-200 rounded-3xl md:w-md w-full group transition-all duration-500 hover:border-primary mt-10 lg:mt-0">
                <h2
                    className="font-manrope font-bold text-3xl leading-10 text-black pb-6 border-b border-gray-200 ">
                    Order Summary
                </h2>
                <div className="data py-6 border-b border-gray-200">
                    <div className="flex items-center justify-between gap-4 mb-5">
                        <p className="font-normal text-lg leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700">Product Cost</p>
                        <p className="font-medium text-lg leading-8 text-gray-900">৳{totalPrice}.00</p>
                    </div>
                    <div className="flex items-center justify-between gap-4 mb-5">
                        <p className="font-normal text-lg leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700">Shipping</p>
                        <p className="font-medium text-lg leading-8 text-gray-600">$00.00</p>
                    </div>
                    <div className="flex items-center justify-between gap-4 ">
                        <p className="font-normal text-lg leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700 ">Coupon Code</p>
                        <p className="font-medium text-lg leading-8 text-red-500">NOT APPLIED</p>
                    </div>
                </div>
                <div className="total flex items-center justify-between pt-6">
                    <p className="font-normal text-xl leading-8 text-black ">Subtotal</p>
                    <h5 className="font-manrope font-bold text-2xl leading-9 text-green-600">৳{totalPrice}.00</h5>
                </div>
            </div>
        </div>
    )
}

export default Payment
