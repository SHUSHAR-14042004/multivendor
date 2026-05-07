import { useState, useEffect, useContext } from 'react'; 
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { AuthContext } from '../context/AuthContext'; 
import { Link, useLocation } from 'react-router-dom';

const Home = () => {
    const { user } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search') || '';
    const categoryQuery = searchParams.get('category') || '';

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Fetching data from our Node.js backend
                const { data } = await axios.get('http://localhost:5000/api/products');
                setProducts(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load products. Is the server running?');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div className="text-center mt-20 text-2xl font-bold text-gray-600">Loading Marketplace...</div>;
    if (error) return <div className="text-center mt-20 text-red-500 font-bold">{error}</div>;

   return (
    <div className="container mx-auto px-6 py-8">
        
        {/* --- DYNAMIC HERO BANNER START --- */}
        <div className="bg-amazon_blue-light rounded-2xl p-10 mb-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between text-white shadow-lg">
            <div className="md:w-1/2 mb-6 md:mb-0">
                <h2 className="text-4xl font-extrabold mb-4 tracking-tight">
                    {user ? `Welcome back, ${user.name}!` : 'Discover amazing products from independent sellers.'}
                </h2>
                <p className="text-lg text-gray-300 mb-8">
                    Shop the best marketplace for unique, handcrafted, and premium goods directly from the creators.
                </p>
                
                {/* SHOW LOGIN/REGISTER IF GUEST, OTHERWISE JUST A BROWSING BUTTON */}
                {!user ? (
                    <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                        <Link to="/login" className="bg-amazon_action hover:bg-amazon_action-hover text-amazon_blue font-bold py-3 px-8 rounded-full shadow-sm transition-all text-center">
                            Sign In
                        </Link>
                        <Link to="/register" className="bg-transparent hover:bg-white/10 border-2 border-white text-white font-bold py-3 px-8 rounded-full transition-all text-center">
                            Create Account
                        </Link>
                    </div>
                ) : (
                    <button className="bg-amazon_action hover:bg-amazon_action-hover text-amazon_blue font-bold py-3 px-8 rounded-full shadow-sm transition-all">
                        Start Browsing
                    </button>
                )}
            </div>
            <div className="md:w-1/3 hidden md:flex justify-center text-9xl">
                🛍️
            </div>
        </div>
        {/* --- DYNAMIC HERO BANNER END --- */}


        <div className="flex justify-between items-end mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Latest Products</h1>
        </div>
        
        {products.length === 0 ? (
            <div className="text-center text-gray-500 text-xl py-20">No products found. Vendors need to add some!</div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products
                    .filter(product => {
                        // 1. Check Search Match
                        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                              product.description.toLowerCase().includes(searchQuery.toLowerCase());
                        
                        // 2. Check Category Match (If no category is in the URL, it automatically matches)
                        // Note: We use optional chaining (product.category?) in case old products don't have a category
                        const matchesCategory = categoryQuery === '' || 
                                                (product.category && product.category.toLowerCase() === categoryQuery.toLowerCase());
                        
                        // Keep the product if it matches BOTH
                        return matchesSearch && matchesCategory;
                    })
                    .map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))
                }
            </div>
        )}
    </div>
);
};

export default Home;