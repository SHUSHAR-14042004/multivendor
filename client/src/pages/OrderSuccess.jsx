import { Link } from 'react-router-dom';

const OrderSuccess = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
            <div className="bg-white p-10 rounded-lg shadow-lg max-w-lg w-full border-t-8 border-green-500">
                <div className="flex justify-center mb-6">
                    <svg className="w-20 h-20 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </div>
                <h1 className="text-3xl font-extrabold text-gray-800 mb-4">Payment Successful!</h1>
                <p className="text-gray-600 mb-8 text-lg">
                    Thank you for your purchase. Your order has been securely processed and sent to the vendor(s).
                </p>
                <Link 
                    to="/" 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded transition duration-300 inline-block w-full"
                >
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
};

export default OrderSuccess;