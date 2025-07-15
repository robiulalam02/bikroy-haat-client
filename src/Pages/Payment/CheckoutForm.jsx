import { CardNumberElement, CardExpiryElement, CardCvcElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react'
import useAxiosSecure from '../../Hooks/useAxiosSecure';

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

const CheckoutForm = ({ price: amount }) => {
    console.log(amount)
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardNumberElement);
        if (card == null) {
            return;
        }

        // Step 1: Create a Payment Method
        const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (paymentMethodError) {
            console.error('[PaymentMethod Error]', paymentMethodError.message);
            return;
        }

        // Step 2: Create PaymentIntent from backend
        try {
            const res = await axiosSecure.post('/create-payment-intent', {
                amount, // Stripe needs amount in cents/poisha
            });

            console.log(res.data)

            const clientSecret = res.data.clientSecret;

            // Step 3: Confirm Card Payment
            const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethod.id,
            });

            if (confirmError) {
                console.error('[Confirm Error]', confirmError.message);
                return;
            }

            // Step 4: Handle success
            if (paymentIntent.status === 'succeeded') {
                console.log('🎉 Payment successful!');
                // Optionally send info to your DB or redirect
            }
        } catch (err) {
            console.error('[Server Error]', err);
        }
    };


    return (
        <form onSubmit={handleSubmit} className="max-w-lg bg-white mx-auto mt-10 p-4 space-y-6 rounded-xl">
            {/* User Info Inputs */}
            <div className="space-y-4">
                {['Full Name', 'Region', 'City', 'Country', 'ZIP Code'].map((label, index) => (
                    <div key={index}>
                        <label className="text-sm text-gray-600">{label}</label>
                        <input
                            type="text"
                            required
                            className="w-full border-0 border-b border-gray-300 focus:outline-none focus:border-primary text-sm py-2"
                            placeholder={label}
                        />
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
                disabled={!stripe}
                className="w-full mt-4 bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-md transition"
            >
                Pay
            </button>
        </form>
    )
}

export default CheckoutForm
