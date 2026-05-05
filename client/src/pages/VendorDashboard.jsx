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
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    // Orders State
    const [orders, setOrders] = useState([]);

    // Security & Data Fetching
    useEffect(() => {
        if (!user || user.role !== 'vendor') {
            navigate('/'); // Kick out non-vendors
        } else {
            fetchVendorOrders();
        }
    }, [user, navigate]);

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
            // We must use FormData because we are sending a file (image) to Cloudinary
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('stock', stock);
            if (image) formData.append('image', image); 

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${user.token}`,
                },
            };

            await axios.post('http://localhost:5000/api/products', formData, config);
            
            toast.success('Product added successfully!')
            // Reset form
            setName(''); setDescription(''); setPrice(''); setStock(''); setImage(null);
            setUploading(false);
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to upload product');
            setUploading(false);
        }
    };

    return (
        <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-8">Vendor Dashboard</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Section 1: Add Product Form */}
                <div className="bg-white p-6 rounded-lg shadow-md h-fit">
                    <h2 className="text-xl font-bold mb-4 border-b pb-2">Add New Product</h2>
                    <form onSubmit={submitHandler}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Product Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-3 py-2 border rounded outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required className="w-full px-3 py-2 border rounded outline-none focus:ring-2 focus:ring-blue-500" rows="3"></textarea>
                        </div>
                        <div className="flex gap-4 mb-4">
                            <div className="w-1/2">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Price ($)</label>
                                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required className="w-full px-3 py-2 border rounded outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div className="w-1/2">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Stock Qty</label>
                                <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required className="w-full px-3 py-2 border rounded outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Product Image</label>
                            <input type="file" onChange={(e) => setImage(e.target.files[0])} accept="image/*" className="w-full" />
                        </div>
                        <button type="submit" disabled={uploading} className="w-full bg-blue-800 text-white font-bold py-2 rounded hover:bg-blue-700 transition duration-300">
                            {uploading ? 'Uploading to Cloud...' : 'Publish Product'}
                        </button>
                    </form>
                </div>

                {/* Section 2: Vendor Orders */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4 border-b pb-2">Your Recent Sales</h2>
                    {orders.length === 0 ? (
                        <p className="text-gray-500 italic">No sales yet. Keep marketing your products!</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="py-2 px-4 text-left">Order ID</th>
                                        <th className="py-2 px-4 text-left">Date</th>
                                        <th className="py-2 px-4 text-left">Status</th>
                                        <th className="py-2 px-4 text-left">Paid</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order._id} className="border-b">
                                            <td className="py-2 px-4 text-sm">{order._id.substring(0, 8)}...</td>
                                            <td className="py-2 px-4 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                                            <td className="py-2 px-4 text-sm">
                                                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">{order.status}</span>
                                            </td>
                                            <td className="py-2 px-4 text-sm">{order.isPaid ? '✅' : '❌'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VendorDashboard;