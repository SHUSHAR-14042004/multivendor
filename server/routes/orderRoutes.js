const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders, getVendorOrders, updateOrderStatus } = require('../controllers/orderController');
const { protect, vendorRole } = require('../middleware/authMiddleware');

// Customer Routes
router.post('/', protect, createOrder);
router.get('/myorders', protect, getMyOrders);

// Vendor & Admin Routes
router.get('/vendor', protect, vendorRole, getVendorOrders);
router.put('/:id/status', protect, vendorRole, updateOrderStatus);

module.exports = router;