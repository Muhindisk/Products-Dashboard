const express = require('express');
const router = express.Router();
const Product = require('../models/products');

// GET /api/products - List all products with filtering, pagination, and search
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// CREATE a new product
router.post('/', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    inStock: req.body.inStock
  });

  try {
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Update a product by ID
router.put('/:id', async (req, res) => {
  try {
     const updatedProduct = await Product.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true, runValidators: true }
        );
     res.json(updatedProduct);
     } catch (error) {
       res.status(400).json({ message: error.message });
     }
});

    // Delete a product by ID
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(
     req.params.id
);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;