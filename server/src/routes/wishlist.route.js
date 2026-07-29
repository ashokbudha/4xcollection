import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  clearWishlist,
} from "../controllers/wishlist.controller.js";

const router = Router();
router.use(verifyJWT);

router.route("/")
  .get(getWishlist)
  .delete(clearWishlist);

router.route("/add")
  .post(addToWishlist);

router.route("/item/:itemId")
  .delete(removeFromWishlist);



export default router;