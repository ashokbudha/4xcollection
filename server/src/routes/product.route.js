import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = Router();

// ---------- Public ----------

router.get("/", getAllProducts);

router.get("/:id", getProductById);

// ---------- Admin ----------

router.use(verifyJWT, verifyAdmin);

router.route("/admin")
.post(
  upload.fields([
    {
      name: "thumbnail",
      maxCount: 1,
    },
    {
      name: "variantImages",
      maxCount: 20,
    },
  ]),
  createProduct
);

router.route("/admin/:id")
.patch(updateProduct)
.delete(deleteProduct);

export default router;