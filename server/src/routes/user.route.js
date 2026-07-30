import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  getAllUsers,
  getUserByIdAdmin,
  deleteUser,
  updateUserRole,
  updateUserStatus,
} from "../controllers/user.controller.js";

import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.middleware.js";

const router = Router();

// Public routes
router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

// Protected routes
router.use(verifyJWT);

router.route("/logout").post(logoutUser);

router.route("/refresh-token").post(refreshAccessToken);

router.route("/me").get(getCurrentUser);

router.route("/change-password").patch(changeCurrentPassword);

// Admin routes
router.use("/admin", verifyAdmin);

router.route("/admin")
  .get(getAllUsers);

router.route("/admin/:id")
  .get(getUserByIdAdmin)
  .delete(deleteUser);

router.route("/admin/:id/role")
  .patch(updateUserRole);

router.route("/admin/:id/status")
  .patch(updateUserStatus);

export default router;