import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('customer'); // Default to customer
    const [loading, setLoading] = useState(false);

    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // 1. Register the user
            const newUser = await register(name, email, password, role);
            
            toast.success(`Welcome to Marketplace! Account created.`);
            
            // 2. Smart Routing based on their new Role
            if (newUser.role === 'vendor') {
                navigate('/vendor-dashboard'); 
            } else {
                navigate('/'); 
            }
            
        } catch (err) {
            // FIXED: Using toast instead of the missing setError
            toast.error(err); 
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center py-12">
            <form onSubmit={submitHandler} className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Create account</h2>
                
                <div className="mb-4">
                    <label className="block text-gray-900 text-sm font-bold mb-1">Your name</label>
                    <input 
                        type="text" value={name} onChange={(e) => setName(e.target.value)} required 
                        className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none focus:border-amazon_yellow focus:ring-1 focus:ring-amazon_yellow shadow-sm" 
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-900 text-sm font-bold mb-1">Email</label>
                    <input 
                        type="email" value={email} onChange={(e) => setEmail(e.target.value)} required 
                        className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none focus:border-amazon_yellow focus:ring-1 focus:ring-amazon_yellow shadow-sm" 
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-900 text-sm font-bold mb-1">Password</label>
                    <input 
                        type="password" value={password} onChange={(e) => setPassword(e.target.value)} required 
                        placeholder="At least 6 characters"
                        className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none focus:border-amazon_yellow focus:ring-1 focus:ring-amazon_yellow shadow-sm" 
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-900 text-sm font-bold mb-2">Account Type</label>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input 
                                type="radio" name="role" value="customer" 
                                checked={role === 'customer'} 
                                onChange={(e) => setRole(e.target.value)} 
                                className="accent-amazon_yellow"
                            />
                            <span className="text-sm">Shopper</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input 
                                type="radio" name="role" value="vendor" 
                                checked={role === 'vendor'} 
                                onChange={(e) => setRole(e.target.value)} 
                                className="accent-amazon_yellow"
                            />
                            <span className="text-sm">Seller (Vendor)</span>
                        </label>
                    </div>
                </div>
                
                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-amazon_action hover:bg-amazon_action-hover text-gray-900 font-medium py-2 px-4 rounded-md shadow-sm border border-amazon_action-hover transition duration-200"
                >
                    {loading ? 'Creating...' : 'Continue'}
                </button>

                <p className="text-sm mt-6 pt-4 border-t border-gray-200">
                    Already have an account? <Link to="/login" className="text-blue-600 hover:text-orange-600 hover:underline">Sign in ⏵</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;