import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Initialize cart from localStorage if it exists, otherwise empty array
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Save to localStorage whenever cart changes
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems((prev) => {
            const existingItem = prev.find((item) => item.product === product._id);
            if (existingItem) {
                // If it exists, increase quantity
                return prev.map((item) => 
                    item.product === product._id ? { ...item, qty: item.qty + 1 } : item
                );
            }
            // Add new item (mapping to match our backend Order schema)
            return [...prev, { 
                product: product._id, 
                name: product.name, 
                price: product.price, 
                vendor: product.vendor._id, 
                qty: 1 
            }];
        });
    };

    const removeFromCart = (id) => {
        setCartItems((prev) => prev.filter((item) => item.product !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};