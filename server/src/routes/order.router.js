import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.middleware.js";

import {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  getAllOrders,
  getOrderByIdAdmin,
  updateOrderStatus,
} from "../controllers/order.controller.js";

const router = Router();

// ---------------- Customer ----------------

router.use(verifyJWT);

router.route("/")
  .post(createOrder)
  .get(getMyOrders);

router.route("/:orderId")
  .get(getOrderById);

router.route("/:orderId/cancel")
  .patch(cancelOrder);

// ---------------- Admin ----------------

router.use("/admin", verifyAdmin);

router.route("/admin")
  .get(getAllOrders);

router.route("/admin/:orderId")
  .get(getOrderByIdAdmin);

router.route("/admin/:orderId/status")
  .patch(updateOrderStatus);

export default router;