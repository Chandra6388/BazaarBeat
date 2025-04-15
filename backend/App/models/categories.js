import { Schema , model } from "mongoose";

const categoryModel = Schema({
    name: {
        type: String,
        required: true 
    },
},
{
    timestamps: true
});