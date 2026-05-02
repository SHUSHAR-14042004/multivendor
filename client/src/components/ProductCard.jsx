import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img 
                src={product.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'} 
                alt={product.name} 
                className="w-full h-48 object-cover"
            />
            <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.description}</p>
                
                <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-extrabold text-blue-600">${product.price}</span>
                    <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        Vendor: {product.vendor?.name || 'Unknown'}
                    </span>
                </div>
                
                <button className="w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-700 transition duration-300 font-semibold">
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;