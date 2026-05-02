import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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
            <h1 className="text-3xl font-extrabold text-gray-800 mb-8">Latest Products</h1>
            
            {products.length === 0 ? (
                <div className="text-center text-gray-500 text-xl">No products found. Vendors need to add some!</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;