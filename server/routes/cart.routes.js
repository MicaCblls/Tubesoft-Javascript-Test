const { getCartById, addProductToCart, deleteCart } = require("../controllers");
const { Router } = require("express");
const router = Router();

router.get("/cart/:id", getCartById);
router.post("/cart", addProductToCart);
router.delete("/cart/:id", deleteCart);

module.exports = router;
