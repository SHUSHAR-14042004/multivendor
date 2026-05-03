import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Cart = () => {
    const { cartItems, removeFromCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);

    const checkoutHandler = () => {
        if (!user) {
            navigate('/login'); // Force login before checkout
        } else {
            navigate('/checkout');
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="text-center mt-20">
                <h2 className="text-3xl font-bold text-gray-700 mb-4">Your Cart is Empty</h2>
                <Link to="/" className="text-blue-600 hover:underline text-lg">Go back to shopping</Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-extrabold mb-8 text-gray-800">Shopping Cart</h1>
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Cart Items */}
                <div className="lg:w-2/3">
                    {cartItems.map((item) => (
                        <div key={item.product} className="flex justify-between items-center bg-white p-4 mb-4 rounded shadow">
                            <div>
                                <h3 className="text-lg font-bold">{item.name}</h3>
                                <p className="text-gray-600">Qty: {item.qty} x ${item.price}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="font-bold text-lg">${(item.price * item.qty).toFixed(2)}</span>
                                <button onClick={() => removeFromCart(item.product)} className="text-red-500 hover:text-red-700 font-bold">
                                    X
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className="lg:w-1/3 bg-white p-6 rounded shadow h-fit">
                    <h2 className="text-2xl font-bold mb-4 border-b pb-4">Order Summary</h2>
                    <div className="flex justify-between mb-4 text-xl">
                        <span>Total:</span>
                        <span className="font-extrabold">${totalPrice}</span>
                    </div>
                    <button 
                        onClick={checkoutHandler}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded transition duration-300"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;