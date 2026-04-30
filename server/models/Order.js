const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User' // The customer who bought the items
    },
    orderItems: [
        {
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            price: { type: Number, required: true },
            product: { 
                type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' 
            },
            vendor: { 
                type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' // The seller
            } 
        }
    ],
    totalPrice: { type: Number, required: true, default: 0.0 },
    isPaid: { type: Boolean, required: true, default: false },
    status: { 
        type: String, 
        required: true, 
        default: 'Processing',
        enum: ['Processing', 'Shipped', 'Delivered'] 
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);