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

router.use(verifyJWT);

// Customer routes without params
router.route("/")
  .post(createOrder)
  .get(getMyOrders);

// Admin middleware
router.use("/admin", verifyAdmin);

// Admin routes
router.route("/admin")
  .get(getAllOrders);

router.route("/admin/:orderId")
  .get(getOrderByIdAdmin);

router.route("/admin/:orderId/status")
  .patch(updateOrderStatus);

// Customer routes with params (keep these last)
router.route("/:orderId")
  .get(getOrderById);

router.route("/:orderId/cancel")
  .patch(cancelOrder);

export default router;