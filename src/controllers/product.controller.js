const productService = require('../services/product.service')

const createProduct = (req, res) => {
  const {name, description, price, stock} = req.body;
  if (!name || !description || typeof price !== 'number' || typeof stock !== 'number') {
    return res.status(400).json({
      success: false,
      message: 'Invalid input'
    });
  }
  const product = productService.createProduct({name, description, price, stock});
  res.status(201).json({
    success: true,
    message: "Product created successfully",
    results: product
  })
}

const getAllProducts = (req, res) => {
  const product = productService.getAllProducts()
  res.status(200).json({
    success: true,
    message: "All products",
    results: product
  })
}

const getProductById = (req, res) => {
  const product = productService.getProductById(req.params.id);
  if (!product) {
    return res.status(404).json({ 
      success: false,
      message: 'Product not found', 
    });
  }
  res.status(200).json({
    success: true,
    message: "Product details",
    results: product
  })
};

const updateProduct = (req, res) => {
  const { name, description, price, stock } = req.body;
  const product = productService.updateProduct(req.params.id, { name, description, price, stock });
  if (!product) {
    return res.status(404).json({ 
      success: false,
      message: 'Product not found', 
    });
  }
  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    results: product
  })
};

const deleteProduct = (req, res) => {
  const product = productService.deleteProduct(req.params.id);
  if (!product) {
    return res.status(404).json({ 
      success: false,
      message: 'Product not found'
    });
  }
  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
    results: product
  });
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};