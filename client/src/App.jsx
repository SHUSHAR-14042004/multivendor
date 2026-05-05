import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
// NEW: Import Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import VendorDashboard from './pages/VendorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import OrderSuccess from './pages/OrderSuccess'; // We will build this next!

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          {/* Toast Container sits at the top level to catch all notifications */}
          <ToastContainer position="bottom-right" autoClose={3000} />
          <Navbar /> 
          <main className="min-h-screen bg-gray-50">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/vendor-dashboard" element={<VendorDashboard />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/order-success" element={<OrderSuccess />} /> {/* NEW ROUTE */}
                <Route path="/checkout" element={
                  <Elements stripe={stripePromise}>
                    <Checkout />
                  </Elements>
                } />
              </Routes>
          </main>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;