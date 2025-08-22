const { v4: uuidv4 } = require('uuid');

let products = [];

const createProduct = ({name, description, price, stock }) => {
  const product = {
    id: uuidv4(),
    name,
    description,
    price,
    stock,
  };
  products.push(product);
  return product;
}

const getAllProducts = () => {
  return products;
}

const getProductById = (id) => {
  return products.find((product) => product.id === id);
};

const updateProduct = (id, {name, description, price, stock }) => {
  const productIndex = products.findIndex((product) => product.id === id);
  if (productIndex === -1) return null;
  const updatedProduct = {
    id,
    name : name || products[productIndex].name,
    description : description || products[productIndex].description,
    price : price !== undefined ? price : products[productIndex].price,
    stock : stock !== undefined ? stock : products[productIndex].stock,
  };
  products[productIndex] = updatedProduct;
  return updatedProduct;
}

const deleteProduct = (id) => {
  const productIndex = products.findIndex((product) => product.id === id);
  if (productIndex === -1) return null;
  const deletedProduct = products[productIndex];
  products.splice(productIndex, 1);
  return deletedProduct;
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
