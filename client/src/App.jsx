import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Navbar stays outside of Routes so it appears on every page */}
        <Navbar /> 
        <main className="min-h-screen bg-gray-50">
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;