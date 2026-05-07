const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        // FIXED: Changed 'user' to 'vendor' to match your controller and frontend!
        vendor: { 
            type: mongoose.Schema.Types.ObjectId, 
            required: true, 
            ref: 'User' 
        },
        name: { type: String, required: true },
        description: { type: String, required: true },
        category: { type: String, required: true, default: 'Electronics' }, 
        price: { type: Number, required: true, default: 0 },
        stock: { type: Number, required: true, default: 0 },
        imageUrl: { type: String, required: true },
    },
    { timestamps: true }
);
module.exports = mongoose.model('Product', productSchema);