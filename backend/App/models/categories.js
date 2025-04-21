// models/Category.js
import { Schema, model } from "mongoose";

const categoryModel = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
}, {
  timestamps: true
});

const Category = model("Category", categoryModel);
export default Category;
