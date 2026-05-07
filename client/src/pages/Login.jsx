import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            // We capture the returned user data from the login function
            const loggedInUser = await login(email, password); 
            
            // Smart Routing based on Role
            if (loggedInUser.role === 'vendor') {
                navigate('/vendor-dashboard'); // Send sellers to their dashboard
            } else if (loggedInUser.role === 'admin') {
                navigate('/admin-dashboard'); // Send admins to command center
            } else {
                navigate('/'); // Send standard customers to the Home page
            }
            
        } catch (err) {
            setError(err);
        }
    };

   return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
        {/* Made the card slightly more rounded with softer shadows */}
        <form onSubmit={submitHandler} className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 w-96">
            <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-900 tracking-tight">Welcome Back</h2>
            
            {error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm">
                {error}
            </div>}
            
            <div className="mb-5">
                <label className="block text-gray-700 text-sm font-semibold mb-2">Email Address</label>
                {/* NEW INPUT STYLING HERE */}
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" 
                    placeholder="you@example.com"
                    required 
                />
            </div>
            
            <div className="mb-8">
                <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
                {/* NEW INPUT STYLING HERE */}
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" 
                    placeholder="••••••••"
                    required 
                />
            </div>
            
            {/* NEW BUTTON STYLING HERE */}
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98]">
                Sign In
            </button>
        </form>
    </div>
);
};

export default Login;