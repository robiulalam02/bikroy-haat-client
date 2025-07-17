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

    console.log(quantity)

    return (
        <div className='max-w-screen-xl mx-auto flex items-center'>
            <div className='w-6/12'>
                <Elements stripe={stripePromise} >
                    <CheckoutForm price={totalPrice} quantity={quantity} product={product} />
                </Elements>
            </div>
            <div class="p-6 border bg-base-100 border-gray-200 rounded-3xl w-md group transition-all duration-500 hover:border-primary ">
                <h2
                    class="font-manrope font-bold text-3xl leading-10 text-black pb-6 border-b border-gray-200 ">
                    Order Summary
                </h2>
                <div class="data py-6 border-b border-gray-200">
                    <div class="flex items-center justify-between gap-4 mb-5">
                        <p class="font-normal text-lg leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700">Product Cost</p>
                        <p class="font-medium text-lg leading-8 text-gray-900">৳{totalPrice}.00</p>
                    </div>
                    <div class="flex items-center justify-between gap-4 mb-5">
                        <p class="font-normal text-lg leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700">Shipping</p>
                        <p class="font-medium text-lg leading-8 text-gray-600">$00.00</p>
                    </div>
                    <div class="flex items-center justify-between gap-4 ">
                        <p class="font-normal text-lg leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700 ">Coupon Code</p>
                        <p class="font-medium text-lg leading-8 text-red-500">NOT APPLIED</p>
                    </div>
                </div>
                <div class="total flex items-center justify-between pt-6">
                    <p class="font-normal text-xl leading-8 text-black ">Subtotal</p>
                    <h5 class="font-manrope font-bold text-2xl leading-9 text-green-600">৳{totalPrice}.00</h5>
                </div>
            </div>
        </div>
    )
}

export default Payment
