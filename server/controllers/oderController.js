const Order = require('../models/Order');
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// @desc    Create new order & generate Stripe payment intent
// @route   POST /api/orders
// @access  Private (Customer)
const createOrder = async (req, res) => {
    try {
        const { orderItems, totalPrice } = req.body;

        if (orderItems && orderItems.length === 0) {
            return res.status(400).json({ message: 'No order items' });
        }

        const order = new Order({
            user: req.user._id,
            orderItems,
            totalPrice
        });

        const createdOrder = await order.save();

        // Generate Stripe Payment Intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(totalPrice * 100), // Stripe requires amount in cents
            currency: 'usd',
            metadata: { orderId: createdOrder._id.toString() }
        });

        res.status(201).json({
            order: createdOrder,
            clientSecret: paymentIntent.client_secret // Sent to frontend to complete payment
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get logged in user's orders (Customer Dashboard)
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get orders for a specific vendor (Vendor Dashboard)
// @route   GET /api/orders/vendor
// @access  Private/Vendor
const getVendorOrders = async (req, res) => {
    try {
        // Find orders where at least one item belongs to this vendor
        const orders = await Order.find({ 'orderItems.vendor': req.user._id });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin or Vendor
const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.status = req.body.status || order.status;
            order.isPaid = req.body.isPaid !== undefined ? req.body.isPaid : order.isPaid;
            
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createOrder, getMyOrders, getVendorOrders, updateOrderStatus };