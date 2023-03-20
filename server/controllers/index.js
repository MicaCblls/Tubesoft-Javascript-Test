const { getProducts } = require("./products.controller");
const {
  getCartById,
  addProductToCart,
  deleteCart,
} = require("./cart.controller");

module.exports = {
  getProducts,
  getCartById,
  addProductToCart,
  deleteCart,
};
