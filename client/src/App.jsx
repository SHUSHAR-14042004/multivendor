import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import VendorDashboard from './pages/VendorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import OrderSuccess from './pages/OrderSuccess';
import Register from './pages/Register';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

// ... your imports stay the same ...

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ToastContainer position="bottom-right" autoClose={3000} />
          
          {/* 1. Global Wrapper: Forces full height and sets base background/text */}
          <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans">
            
            {/* Navbar sits at the top */}
            <Navbar /> 
            
            {/* 2. Main Content Wrapper: This forces perfect alignment on ALL pages */}
            <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/vendor-dashboard" element={<VendorDashboard />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route path="/checkout" element={
                  <Elements stripe={stripePromise}>
                    <Checkout />
                  </Elements>
                } />
              </Routes>
            </main>

            {/* Optional: Add a simple footer here later so the page doesn't just end abruptly */}
            
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;