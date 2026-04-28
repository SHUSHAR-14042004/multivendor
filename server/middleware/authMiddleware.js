const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - verify token
const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header (Format: "Bearer <token>")
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token payload (excluding the password)
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// Check if user is a Vendor
const vendorRole = (req, res, next) => {
    if (req.user && (req.user.role === 'vendor' || req.user.role === 'admin')) {
        next();
    } else {
        res.status(403).json({ message: 'Access denied: Vendor only' });
    }
};

// Check if user is an Admin
const adminRole = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied: Admin only' });
    }
};

module.exports = { protect, vendorRole, adminRole };