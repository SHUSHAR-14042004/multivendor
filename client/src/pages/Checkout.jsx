import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Checkout = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { cartItems, clearCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        if (!stripe || !elements) return; // Stripe hasn't loaded yet

        try {
            // 1. Create order on the backend to get the clientSecret
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            };

            // FIXED: Using dynamic environment variable for deployment
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/orders`, {
                orderItems: cartItems,
                totalPrice: totalPrice,
            }, config);

            // 2. Confirm the card payment with Stripe
            const payload = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: { name: user.name, email: user.email },
                },
            });

           if (payload.error) {
                toast.error(`Payment failed: ${payload.error.message}`); 
                setProcessing(false);
            } else {
                // Payment successful!
                clearCart();
                toast.success('Payment Successful! Order Placed.'); 
                navigate('/order-success'); 
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'An error occurred during checkout'); 
            setProcessing(false);
        }
    };

    if (cartItems.length === 0) return <div className="text-center mt-20 text-xl">Your cart is empty.</div>;

    return (
        <div className="container mx-auto px-6 py-12 max-w-lg">
            <div className="bg-white p-8 rounded-lg shadow-md border">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Secure Checkout</h1>
                
                <div className="mb-6 pb-6 border-b">
                    <p className="text-lg font-semibold flex justify-between">
                        <span>Total Amount:</span>
                        <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Credit Card Details</label>
                        <div className="p-3 border rounded-md shadow-sm bg-gray-50">
                            <CardElement options={{
                                style: { base: { fontSize: '16px', color: '#424770', '::placeholder': { color: '#aab7c4' } } }
                            }} />
                        </div>
                    </div>

                    {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}

                    <button 
                        type="submit" 
                        disabled={!stripe || processing}
                        className={`w-full text-white font-bold py-3 rounded-md transition duration-300 ${
                            processing ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {processing ? 'Processing...' : `Pay $${totalPrice.toFixed(2)}`}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Checkout;