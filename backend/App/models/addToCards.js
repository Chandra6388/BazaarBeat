import { Schema, model } from "mongoose";

const addToCart = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Products',
        required: true
    },
     
},
    {
        timestamps: true
    });
const addToCartSchema = model('addToCart', addToCart);
export default addToCartSchema;