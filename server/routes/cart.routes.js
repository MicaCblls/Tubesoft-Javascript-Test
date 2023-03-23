const {
  getCartById,
  addProductToCart,
  deleteCart,
  getCarts,
  updateProductAmount,
} = require("../controllers");
const { Router } = require("express");
const router = Router();

router.get("/cart/:id", getCartById);
router.get("/cart", getCarts);
router.post("/cart", addProductToCart);
router.put("/cart/:id", updateProductAmount);
router.delete("/cart/:id", deleteCart);

module.exports = router;
