const mongoose = require('mongoose');

//Define Schema (Create Collections/Tables)
const productSchema = new mongoose.Schema({
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
  category: {
    type: String,
    required: true
  },
  inStock: {
    type: Boolean,
    default: true
  },
}, { timestamps: true });

// Create Model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
