const { getProducts } = require("./products.controller");
const {
  getCartById,
  addProductToCart,
  updateProductAmount,
  deleteCart,
  getCarts,
} = require("./cart.controller");

module.exports = {
  getProducts,
  getCartById,
  addProductToCart,
  updateProductAmount,
  deleteCart,
  getCarts,
};
