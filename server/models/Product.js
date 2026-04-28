const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    vendor: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User' // Links this product to a specific vendor
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    imageUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);