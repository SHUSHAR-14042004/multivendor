import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    
    // NEW: Search State
    const [keyword, setKeyword] = useState('');

    // NEW: Search Handler
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/?search=${keyword}`);
        } else {
            navigate('/');
        }
    };
    
    return (
        <header className="sticky top-0 z-50 w-full">
            {/* Top Utility Bar */}
            <nav className="bg-amazon_blue text-white px-4 py-2 flex items-center justify-between gap-4">
                <Link to="/" className="text-2xl font-bold border border-transparent hover:border-white px-2 py-1 transition-all">
                    Marketplace<span className="text-amazon_yellow text-sm font-normal">.in</span>
                </Link>

                {/* Massive Search Bar (The heart of an e-commerce app) */}
                <form onSubmit={searchSubmitHandler} className="hidden md:flex flex-grow max-w-3xl items-center h-10 rounded-md overflow-hidden bg-white focus-within:ring-2 focus-within:ring-amazon_yellow">
                    <input 
                        type="text" 
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        className="flex-grow px-4 h-full text-black outline-none" 
                        placeholder="Search for products, brands and more"
                    />
                    <button type="submit" className="bg-amazon_yellow hover:bg-amazon_yellow-hover h-full px-5 flex items-center justify-center transition-colors">
                        <svg className="w-5 h-5 text-amazon_blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>
                </form>

                <div className="flex items-center gap-4 pr-4">
                    {user && user.role === 'vendor' && (
                        <Link to="/vendor-dashboard" className="hidden md:flex border border-transparent hover:border-white p-2 rounded items-center">
                            <p className="font-bold text-sm text-amazon_yellow">Seller Central</p>
                        </Link>
                    )}
                    {user ? (
                        <div className="flex items-center gap-3 border border-transparent hover:border-white p-2 rounded">
                            <div className="hidden sm:block">
                                <p className="text-xs text-gray-300">Hello, {user.name}</p>
                                <p className="font-bold text-sm">Account & Lists</p>
                            </div>
                            <button 
                                onClick={() => { logout(); navigate('/login'); }}
                                className="bg-amazon_yellow hover:bg-amazon_yellow-hover text-amazon_blue text-xs font-bold px-3 py-1.5 rounded-sm transition-colors"
                            >
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="border border-transparent hover:border-white p-2 leading-tight rounded">
                            <p className="text-xs text-gray-300">Hello, sign in</p>
                            <p className="font-bold text-sm">Account & Lists</p>
                        </Link>
                    )}

                    <Link to="/cart" className="flex items-center gap-1 border border-transparent hover:border-white p-2 rounded">
                        <span className="text-amazon_yellow font-bold text-2xl">🛒</span>
                        <p className="font-bold self-end mt-1 hidden sm:block">Cart</p>
                    </Link>
                </div>
            </nav>

            
            {/* Sub-Navigation (Category Bar) */}
            <div className="bg-amazon_blue-light text-white flex items-center px-6 py-1 text-sm gap-6 overflow-x-auto whitespace-nowrap">
                <button onClick={() => navigate('/')} className="font-bold flex items-center gap-1 hover:border border-transparent hover:border-white p-1 rounded">
                    ☰ All
                </button>
                <button onClick={() => navigate('/?category=Fresh')} className="hover:border border-transparent hover:border-white p-1 rounded">Groceries</button>
                <button onClick={() => navigate('/?category=Mobiles')} className="hover:border border-transparent hover:border-white p-1 rounded">Mobiles</button>
                <button onClick={() => navigate('/?category=Electronics')} className="hover:border border-transparent hover:border-white p-1 rounded">Electronics</button>
                <button onClick={() => navigate('/?category=Gift Ideas')} className="hover:border border-transparent hover:border-white p-1 rounded">Gift Ideas</button>
            
            </div>
        </header>
    );
};

export default Navbar;