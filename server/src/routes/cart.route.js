import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getCart, clearCart, addToCart, updateCartItem, removeCartItem } from "../controllers/cart.controller.js";

const router = Router();
router.use(verifyJWT);
router.route("/")
  .get(getCart)
  .delete(clearCart);

router.route("/add")
  .post(addToCart);

router.route("/item/:itemId")
  .patch(updateCartItem)
  .delete(removeCartItem);



export default router;