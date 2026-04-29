const express = require('express');
const router = express.Router();
const { createProduct, getProducts, deleteProduct } = require('../controllers/productController');
const { protect, vendorRole } = require('../middleware/authMiddleware');
const { upload } = require('../config/cloudinary');

// Public route for customers to view products
router.get('/', getProducts);

// Protected routes for vendors
// Notice how we use 'upload.single('image')' middleware to intercept the file
router.post('/', protect, vendorRole, upload.single('image'), createProduct);
router.delete('/:id', protect, vendorRole, deleteProduct);

module.exports = router;