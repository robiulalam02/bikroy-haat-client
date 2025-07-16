import { CardNumberElement, CardExpiryElement, CardCvcElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react'
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import Spinner from '../../Components/Loaders/Spinner';
import Swal from 'sweetalert2';
import { IoMdCheckboxOutline } from "react-icons/io";


const inputStyle = {
    style: {
        base: {
            fontSize: '16px',
            color: '#1f2937', // Tailwind gray-800
            '::placeholder': { color: '#9ca3af' }, // gray-400
            borderBottom: '1px solid #d1d5db', // gray-300 underline
            padding: '10px 0',
        },
        invalid: {
            color: '#dc2626', // red-600
        },
    },
};

const CheckoutForm = ({ price: amount, product }) => {
    console.log(amount)
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [cardError, setCardError] = useState('');
    const { profile, setLoading: setGlobLoader } = useAuth();
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        if (!stripe || !elements) return;

        const { fullName, region, city, country, zip } = data;

        const card = elements.getElement(CardNumberElement);
        if (!card) return;

        const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
            billing_details: {
                name: fullName,
                address: {
                    city,
                    country,
                    postal_code: zip,
                    state: region,
                },
            },
        });

        if (paymentMethodError) {
            console.log(paymentMethodError.message)
            toast.error(paymentMethodError.message);
            return;
        }

        try {
            setLoading(true);
            const res = await axiosSecure.post('/create-payment-intent', { amount });
            const clientSecret = res.data.clientSecret;

            const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethod.id,
            });

            if (confirmError) {
                toast.error(confirmError.message);
                return;
            }

            if (paymentIntent.status === 'succeeded') {
                const paymentInfo = {
                    userEmail: profile?.email,
                    fullName,
                    amount,
                    paymentIntentId: paymentIntent.id,
                    status: paymentIntent.status,
                    productId: product._id,
                    productName: product.name,
                    marketName: product.marketName,
                    billingDetails: {
                        city,
                        region,
                        country,
                        postal_code: zip,
                    },
                    date: new Date().toISOString().split("T")[0]
                };

                try {
                    setGlobLoader(true);
                    const res = await axiosSecure.post('/orders', paymentInfo);
                    if (res.data?.success) {
                        Swal.fire({
                            title: `Order Placed!`,
                            html:
                                `<p class="text-sm text-gray-700">Your order has been placed successfully.</p>
                                <p class="mt-2 text-sm  font-medium">Order ID: <span class="font-mono text-blue-600">${res.data.orderId}</span></p>`,
                            icon: 'success',
                            confirmButtonText: 'View Orders',
                            confirmButtonColor: '#77af29', // Tailwind primary-blue
                            customClass: {
                                popup: 'rounded-xl p-6',
                                title: 'text-xl font-semibold text-gray-800',
                                htmlContainer: 'text-center',
                            }
                        }).then(() => {
                            // Optional: redirect to "My Orders" page after confirmation
                            // navigate('/dashboard/my-orders');
                        });
                    } else {
                        toast.error('Something went wrong!');
                    }

                } catch (error) {
                    setGlobLoader(false);
                    toast.error('Error while saving payment info!')
                } finally {
                    setGlobLoader(false);
                }

            }
        } catch (err) {
            setLoading(false);
            console.error('[Server Error]', err);
            toast.error('Something went wrong!');
        } finally {
            setLoading(false);
        }
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg bg-white mx-auto mt-10 p-4 space-y-6 rounded-xl">

            {/* User Info Inputs */}
            <div className="space-y-4">
                {[
                    { name: 'fullName', label: 'Full Name' },
                    { name: 'region', label: 'Region' },
                    { name: 'city', label: 'City' },
                    { name: 'country', label: 'Country (e.g. BD, US)' },
                    { name: 'zip', label: 'ZIP Code' },
                ].map(({ name, label }) => (
                    <div key={name}>
                        <label className="text-sm text-gray-600">{label}</label>

                        {name === 'country' ? (
                            <input
                                type="text"
                                maxLength={2}
                                {...register('country', {
                                    required: 'Country code is required',
                                    pattern: {
                                        value: /^[A-Z]{2}$/,
                                        message: 'Use 2-letter uppercase country code (e.g., BD, US)',
                                    },
                                })}
                                onInput={(e) => (e.target.value = e.target.value.toUpperCase())}
                                className="w-full border-0 border-b border-gray-300 focus:outline-none focus:border-primary text-sm py-2"
                                placeholder="Country (e.g. BD, US)"
                            />
                        ) : (
                            <input
                                type="text"
                                {...register(name, { required: `${label} is required` })}
                                className="w-full border-0 border-b border-gray-300 focus:outline-none focus:border-primary text-sm py-2"
                                placeholder={label}
                            />
                        )}

                        {errors[name] && (
                            <p className="text-red-500 text-xs mt-1">{errors[name].message}</p>
                        )}
                    </div>
                ))}
            </div>


            {/* Card Number */}
            <div>
                <label className="text-sm text-gray-600">Card Number</label>
                <div className="border-b border-gray-300 py-2">
                    <CardNumberElement options={inputStyle} />
                </div>
            </div>

            {/* Expiry & CVC */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-sm text-gray-600">Expiry Date</label>
                    <div className="border-b border-gray-300 py-2">
                        <CardExpiryElement options={inputStyle} />
                    </div>
                </div>
                <div>
                    <label className="text-sm text-gray-600">CVC</label>
                    <div className="border-b border-gray-300 py-2">
                        <CardCvcElement options={inputStyle} />
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={!stripe || loading}
                className="w-full mt-4 bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-md transition text-center"
            >
                {
                    loading ?
                        <Spinner />
                        :
                        'Pay Now'
                }
            </button>
        </form>

    )
}

export default CheckoutForm
