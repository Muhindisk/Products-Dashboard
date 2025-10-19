const express = require('express');
const router = express.Router();
const Product = require('../models/products');

// GET /api/products - List all products with filtering, pagination, and search
router.get("/", async (req, res) => {
  try {
    console.log('Fetching products...');
    const products = await Product.find();
    console.log(`Found ${products.length} products`);
    res.json(products);
  } catch (error) {
    console.error('Error in GET /api/products:', error);
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
    console.log('Product created:', savedProduct._id);
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Error in POST /api/products:', error);
    res.status(400).json({ message: error.message });
  }
});


// Update a product by ID
router.put('/:id', async (req, res) => {
  try {
    console.log('Updating product:', req.params.id, req.body);
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    console.log('Product updated:', updatedProduct._id);
    res.json(updatedProduct);
  } catch (error) {
    console.error('Error in PUT /api/products/:id:', error);
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
    console.error('Error in DELETE /api/products/:id:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;