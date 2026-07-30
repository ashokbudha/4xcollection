import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

const router = Router();

// ---------- Public ----------

router.route("/")
  .get(getCategories);

router.route("/:id")
  .get(getCategory);

// ---------- Admin ----------

router.use(verifyJWT,verifyAdmin);

router.route("/admin")
  .post(
    upload.fields([
      {
        name: "imageUrl",
        maxCount: 1,
      },
    ]),
    createCategory
  );

router.route("/admin/:id")
  .patch(
    upload.fields([
      {
        name: "imageUrl",
        maxCount: 1,
      },
    ]),
    updateCategory
  )
  .delete(deleteCategory);

export default router;