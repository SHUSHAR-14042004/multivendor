import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useContext(CartContext);

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
                </div>
                
                <button 
                    onClick={() => addToCart(product)}
                    className="w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-700 transition duration-300 font-semibold"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;