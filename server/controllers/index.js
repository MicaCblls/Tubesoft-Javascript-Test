const { getProducts } = require("./products.controller");
const {
  getCartById,
  addProductToCart,
  deleteCart,
  getCarts,
} = require("./cart.controller");

module.exports = {
  getProducts,
  getCartById,
  addProductToCart,
  deleteCart,
  getCarts,
};
