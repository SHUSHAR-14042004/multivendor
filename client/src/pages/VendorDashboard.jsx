import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const VendorDashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // Form State
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [category, setCategory] = useState('Electronics');
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    // Orders State
    const [orders, setOrders] = useState([]);
    const [myProducts, setMyProducts] = useState([]); // <-- Make sure this is here!

    useEffect(() => {
        if (!user || user.role !== 'vendor') {
            navigate('/'); 
        } else {
            fetchVendorOrders();
            fetchMyInventory(); // <-- Make sure this is called!
        }
    }, [user, navigate]);

    const fetchMyInventory = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/products');
            const vendorInventory = data.filter(product => product.vendor._id === user._id);
            setMyProducts(vendorInventory);
        } catch (error) {
            console.error('Error fetching inventory', error);
        }
    };

    const fetchVendorOrders = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.get('http://localhost:5000/api/orders/vendor', config);
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders', error);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setUploading(true);

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('stock', stock);
            formData.append('category', category);
            if (image) formData.append('image', image); 

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${user.token}`,
                },
            };

            await axios.post('http://localhost:5000/api/products', formData, config);
            
            toast.success('Product published to marketplace successfully!');
            setName(''); setDescription(''); setPrice(''); setStock(''); setImage(null);
            setUploading(false);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to upload product');
            setUploading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Seller Central</h1>
                    <p className="text-gray-500 mt-1">Manage your inventory and track customer orders.</p>
                </div>
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-2 rounded-md font-medium text-sm">
                    Store Status: Active
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* --- LEFT COLUMN (Upload Form + Active Inventory) --- */}
                <div className="lg:col-span-5">
                    
                    {/* 1. Add New Product Form */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h2 className="text-xl font-bold mb-6 text-gray-900 border-b border-gray-100 pb-2">Add New Product</h2>
                        
                        <form onSubmit={submitHandler}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-1.5">Product Title</label>
                                <input 
                                    type="text" value={name} onChange={(e) => setName(e.target.value)} required 
                                    placeholder="e.g. Wireless Noise-Cancelling Headphones"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-amazon_yellow focus:ring-1 focus:ring-amazon_yellow transition-shadow" 
                                />
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-1.5">Description</label>
                                <textarea 
                                    value={description} onChange={(e) => setDescription(e.target.value)} required 
                                    placeholder="Highlight the key features and specifications..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-amazon_yellow focus:ring-1 focus:ring-amazon_yellow transition-shadow" 
                                    rows="4"
                                ></textarea>
                            </div>
                            
                            <div className="flex gap-4 mb-4">
                                <div className="w-1/2">
                                    <label className="block text-gray-700 text-sm font-bold mb-1.5">Price (USD)</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2 text-gray-500">$</span>
                                        <input 
                                            type="number" value={price} onChange={(e) => setPrice(e.target.value)} required 
                                            className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md outline-none focus:border-amazon_yellow focus:ring-1 focus:ring-amazon_yellow transition-shadow" 
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>
                                <div className="w-1/2">
                                    <label className="block text-gray-700 text-sm font-bold mb-1.5">Initial Stock</label>
                                    <input 
                                        type="number" value={stock} onChange={(e) => setStock(e.target.value)} required 
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-amazon_yellow focus:ring-1 focus:ring-amazon_yellow transition-shadow" 
                                        placeholder="Quantity"
                                    />
                                </div>
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-1.5">Category</label>
                                <select 
                                    value={category} 
                                    onChange={(e) => setCategory(e.target.value)} 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-amazon_yellow focus:ring-1 focus:ring-amazon_yellow bg-white"
                                >
                                    <option value="Fresh">Groceries</option>
                                    <option value="Mobiles">Mobile Phones</option>
                                    <option value="Electronics">Electronics</option>
                                    <option value="Gift Ideas">Gift Ideas</option>
                                </select>
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-1.5">Product Image</label>
                                <input 
                                    type="file" onChange={(e) => setImage(e.target.files[0])} accept="image/*" required
                                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-amazon_blue-light file:text-white hover:file:bg-amazon_blue transition-colors cursor-pointer border border-gray-300 rounded-md p-1" 
                                />
                            </div>
                            
                            <button 
                                type="submit" disabled={uploading} 
                                className="w-full bg-amazon_action hover:bg-amazon_action-hover text-gray-900 font-bold py-2.5 rounded-md shadow-sm border border-amazon_action-hover transition duration-200"
                            >
                                {uploading ? 'Processing Image...' : 'Publish to Storefront'}
                            </button>
                        </form>
                    </div>

                    {/* 2. Active Inventory (Newly Added!) */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mt-8">
                        <h2 className="text-xl font-bold mb-4 text-gray-900 border-b border-gray-100 pb-2">Your Published Products</h2>
                        
                        {myProducts.length === 0 ? (
                            <p className="text-sm text-gray-500 italic">You haven't published any products yet.</p>
                        ) : (
                            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                                {myProducts.map(product => (
                                    <div key={product._id} className="flex items-center gap-4 p-3 border border-gray-100 rounded-md hover:bg-gray-50">
                                        <img src={product.imageUrl} alt={product.name} className="w-12 h-12 object-cover rounded border border-gray-200" />
                                        <div className="flex-grow">
                                            <h4 className="text-sm font-bold text-gray-900 line-clamp-1">{product.name}</h4>
                                            <p className="text-xs text-gray-500">${product.price} • Stock: {product.stock}</p>
                                        </div>
                                        <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-1 rounded-full border border-green-200">Live</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* --- RIGHT COLUMN (Recent Orders Table) --- */}
                <div className="lg:col-span-7">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-24">
                        <h2 className="text-xl font-bold mb-6 text-gray-900 border-b border-gray-100 pb-2">Recent Sales Fulfillment</h2>
                        
                        {orders.length === 0 ? (
                            <div className="text-center py-12 bg-gray-50 rounded-md border border-dashed border-gray-300">
                                <span className="text-4xl mb-3 block">📦</span>
                                <h3 className="text-lg font-medium text-gray-900">No orders yet</h3>
                                <p className="text-gray-500 mt-1">When customers buy your products, they will appear here.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto rounded-md border border-gray-200">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID</th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date Placed</th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Payment</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {orders.map((order) => (
                                            <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                                                    #{order._id.substring(0, 8)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(order.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2.5 py-1 rounded-full border border-yellow-200">
                                                        {order.status || 'Processing'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                                    {order.isPaid ? 
                                                        <span className="text-green-600 font-bold">Paid ✅</span> : 
                                                        <span className="text-red-500 font-bold">Pending ❌</span>
                                                    }
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorDashboard;