import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Kick out anyone who isn't an admin
        if (!user || user.role !== 'admin') {
            navigate('/');
        } else {
            fetchUsers();
        }
    }, [user, navigate]);

    const fetchUsers = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.get('http://localhost:5000/api/users', config);
            setUsers(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users', error);
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center mt-20 text-xl font-bold">Loading Admin Data...</div>;

    return (
        <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-8">Admin Control Panel</h1>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4 border-b pb-2">Platform Users</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="py-3 px-4 text-left">ID</th>
                                <th className="py-3 px-4 text-left">Name</th>
                                <th className="py-3 px-4 text-left">Email</th>
                                <th className="py-3 px-4 text-left">Role</th>
                                <th className="py-3 px-4 text-left">Joined</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u) => (
                                <tr key={u._id} className="border-b hover:bg-gray-50">
                                    <td className="py-3 px-4 text-sm text-gray-600">{u._id.substring(0, 8)}...</td>
                                    <td className="py-3 px-4 font-semibold">{u.name}</td>
                                    <td className="py-3 px-4 text-blue-600"><a href={`mailto:${u.email}`}>{u.email}</a></td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                                            u.role === 'admin' ? 'bg-red-100 text-red-800' : 
                                            u.role === 'vendor' ? 'bg-purple-100 text-purple-800' : 
                                            'bg-green-100 text-green-800'
                                        }`}>
                                            {u.role.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-sm">{new Date(u.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;