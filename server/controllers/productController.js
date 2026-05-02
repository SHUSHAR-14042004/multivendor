const Product = require('../models/Product');

const createProduct = async (req, res) => {
    try {
        const { name, description, price, stock } = req.body;
        const imageUrl = req.file ? req.file.path : '';
        const product = await Product.create({
            vendor: req.user._id,
            name, description, price, stock, imageUrl
        });
        res.status(201).json(product);
    } catch (error) { res.status(500).json({ message: error.message }); }
};

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}).populate('vendor', 'name');
        res.json(products);
    } catch (error) { res.status(500).json({ message: error.message }); }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        if (product.vendor.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to delete' });
        }
        await product.deleteOne();
        res.json({ message: 'Product removed' });
    } catch (error) { res.status(500).json({ message: error.message }); }
};

module.exports = { createProduct, getProducts, deleteProduct };