// // models/Category.js
// import { Schema, model } from "mongoose";

// const categoryModel = new Schema({
//   name: {
//     type: String,
//     required: true,
//     unique: true,
//   },
// }, {
//   timestamps: true
// });

// const Category_Model = model("Category", categoryModel);
// export default Category_Model;


// models/Category.js
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("Category", categorySchema);
