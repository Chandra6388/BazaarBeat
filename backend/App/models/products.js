import { Schema , model } from "mongoose";

const productModel = Schema({
    name: {
        type: String,
        required: true 
    },
    description: {
        type: String,
        required: true 
    },
    price: {
        type: Number,
        required: true 
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'categories',
    },
    stock: {
        type: Number,
        required: true 
    },
    rating: {
        type: Number,
        default: 0
    },
    reviews: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    image_url: {
        type: String,
        default: null
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
},
{
    timestamps: true
});

const product = model('products', productModel);
export default product;