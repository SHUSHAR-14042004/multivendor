import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import Navbar from './components/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout.jsx';
import VendorDashboard from './pages/VendorDashboard';

// Initialize Stripe outside of component render to avoid recreating the object
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar /> 
          <main className="min-h-screen bg-gray-50">
              <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/cart" element={<Cart />} />
  <Route path="/vendor-dashboard" element={<VendorDashboard />} /> {/* NEW ROUTE */}
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