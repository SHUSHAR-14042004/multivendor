import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useContext(CartContext);

    return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1">
        <div className="overflow-hidden h-56"> {/* Wrapper to hide zooming image */}
            <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
        </div>
        <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">{product.name}</h3>
            <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">{product.description}</p>
            
            <div className="flex justify-between items-end mb-5">
                <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                <span className="text-xs font-medium bg-gray-50 text-gray-500 px-3 py-1.5 rounded-full border border-gray-100">
                    {product.vendor?.name || 'Store'}
                </span>
            </div>
            
            <button 
                onClick={() => addToCart(product)}
                className="w-full bg-gray-900 text-white py-2.5 rounded-xl hover:bg-gray-800 transition-colors duration-200 font-medium active:scale-[0.98]"
            >
                Add to Cart
            </button>
        </div>
    </div>
);
};

export default ProductCard;