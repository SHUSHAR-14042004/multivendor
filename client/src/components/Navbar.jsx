import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-blue-800 text-white shadow-lg">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold tracking-tight hover:text-gray-200">
                    MERN Marketplace
                </Link>
                
                <div className="flex space-x-6 items-center">
                    <Link to="/" className="hover:text-blue-300 transition duration-300">Home</Link>
                    
                    {user ? (
                        <>
                            {/* Role-based dashboard links */}
                            {user.role === 'vendor' && (
                                <Link to="/vendor-dashboard" className="hover:text-blue-300">Vendor Panel</Link>
                            )}
                            {user.role === 'admin' && (
                                <Link to="/admin-dashboard" className="hover:text-blue-300">Admin Panel</Link>
                            )}
                            
                            <Link to="/cart" className="hover:text-blue-300">Cart</Link>
                            
                            <div className="flex items-center space-x-4 ml-4 border-l pl-4 border-blue-600">
                                <span className="text-sm font-semibold text-blue-200">Hi, {user.name}</span>
                                <button 
                                    onClick={handleLogout}
                                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-sm font-bold transition duration-300"
                                >
                                    Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <Link 
                            to="/login" 
                            className="bg-white text-blue-800 hover:bg-gray-100 px-5 py-2 rounded-md font-bold transition duration-300"
                        >
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;