import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { Cart } from "../models/cart.model.js";
import { Order } from "../models/order.model.js";
import {
  validateAddress,
  buildOrderItems,
  calculateTotals,
  generateOrderNumber,
  updateInventory,
  restoreInventory
} from "../services/order.service.js";




// ----------------Customer Order Controller----------------------------------------

const createOrder = asyncHandler(async (req, res) => {
  // ========= MVP =========
  // 1. Read request data
  // 2. Validate required fields
  // 3. Validate address ID
  // 4. Validate payment method
  // 5. Find address
  // 6. Verify address ownership
  // 7. Get user's cart
  // 8. Ensure cart is not empty
  // 9. Validate every cart item
  //    - Product exists
  //    - Variant exists
  //    - Stock available
  // 10. Build order items snapshot
  // 11. Calculate subtotal
  // 12. Calculate shipping fee
  // 13. Calculate total amount
  // 14. Generate order number
  // 15. Create order
  // 16. Reduce product stock
  // 17. Clear user's cart
  // 18. Return response

  // ===== TODO =====
  // Coupon
  // Online payment verification
  // Inventory transaction history
  // Email notification

    // 1. Read request data
  const { addressId, paymentMethod } = req.body;

  // 2. Validate required fields
  if (!addressId || !paymentMethod) {
    throw new ApiError(400, "Address and payment method are required.");
  }

  // 3-6. Validate address & ownership
  const address = await validateAddress(addressId, req.user._id);

  // 7. Get user's cart
  const cart = await Cart.findOne({ userId: req.user._id });

  if (!cart) {
    throw new ApiError(404, "Cart not found.");
  }

  // 8. Ensure cart is not empty
  if (cart.items.length === 0) {
    throw new ApiError(400, "Your cart is empty.");
  }

  // 9-11. Build order items & calculate subtotal
  const { orderItems, subtotal } = await buildOrderItems(cart.items);

  // 12-13. Calculate totals
  const {
    shippingFee,
    discount,
    totalAmount,
  } = calculateTotals(subtotal);

  // 14. Generate order number
  const orderNumber = generateOrderNumber();

  // 15. Create order
  const order = await Order.create({
    orderNumber,
    userId: req.user._id,

    orderItems,

    subtotal,
    shippingFee,
    discount,
    totalAmount,

    paymentMethod,

    shippingAddress: {
      fullName: address.fullName,
      phone: address.phone,
      province: address.province,
      district: address.district,
      city: address.city,
      street: address.street,
      landmark: address.landmark,
      postalCode: address.postalCode,
    },
  });

  // 16. Reduce inventory
  await updateInventory(orderItems);

  // 17. Clear cart
  cart.items = [];
  await cart.save();

  // 18. Return response
  return res.status(201).json(
    new ApiResponse(
      201,
      order,
      "Order placed successfully."
    )
  );
});


const getMyOrders = asyncHandler(async (req, res) => {
  // ========= MVP =========
  // 1. Get logged-in user
  // 2. Find user's orders
  // 3. Sort newest first
  // 4. Return response

   // 1. Get logged-in user
  const userId = req.user._id;

  // 2 & 3. Find user's orders and sort newest first
  const orders = await Order.find({ userId })
    .sort({ createdAt: -1 });

  // 4. Return response
  return res.status(200).json(
    new ApiResponse(
      200,
      orders,
      "Orders fetched successfully."
    )
  );
});

const getOrderById = asyncHandler(async (req, res) => {
  // ========= MVP =========
  // 1. Read order ID
  // 2. Validate ObjectId
  // 3. Find order
  // 4. Verify ownership
  // 5. Return response


   // 1. Read order ID
  const { orderId } = req.params;

  // 2. Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new ApiError(400, "Invalid order ID.");
  }

  // 3. Find order
  const order = await Order.findById(orderId);

  if (!order) {
    throw new ApiError(404, "Order not found.");
  }

  // 4. Verify ownership
  if (order.userId.toString() !== req.user._id.toString()) {
    throw new ApiError(
      403,
      "You are not authorized to view this order."
    );
  }

  // 5. Return response
  return res.status(200).json(
    new ApiResponse(
      200,
      order,
      "Order fetched successfully."
    )
  );
});

const cancelOrder = asyncHandler(async (req, res) => {
  // ========= MVP =========
  // 1. Read order ID
  // 2. Validate ObjectId
  // 3. Find order
  // 4. Verify ownership
  // 5. Ensure order can be cancelled
  // 6. Restore product stock
  // 7. Update order status
  // 8. Save
  // 9. Return response

  // ===== TODO =====
  // Refund online payments


   // 1. Read order ID
  const { orderId } = req.params;

  // 2. Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new ApiError(400, "Invalid order ID.");
  }

  // 3. Find order
  const order = await Order.findById(orderId);

  if (!order) {
    throw new ApiError(404, "Order not found.");
  }

  // 4. Verify ownership
  if (order.userId.toString() !== req.user._id.toString()) {
    throw new ApiError(
      403,
      "You are not authorized to cancel this order."
    );
  }

  // 5. Ensure order can be cancelled
  if (order.orderStatus === "cancelled") {
    throw new ApiError(400, "Order is already cancelled.");
  }

  if (
    order.orderStatus === "shipped" ||
    order.orderStatus === "delivered"
  ) {
    throw new ApiError(
      400,
      `Cannot cancel a ${order.orderStatus} order.`
    );
  }

  // 6. Restore product stock
  await restoreInventory(order.orderItems);

  // 7. Update order status
  order.orderStatus = "cancelled";

  // 8. Save
  await order.save();

  // 9. Return response
  return res.status(200).json(
    new ApiResponse(
      200,
      order,
      "Order cancelled successfully."
    )
  );
});

// -----------------------Admin Order Controllers-------------------------------------

const getAllOrders = asyncHandler(async (req, res) => {
  // 1. Get all orders
  const orders = await Order.find()
    .populate("userId", "fullName email")
    .sort({ createdAt: -1 });

  // 2. Return response
  return res.status(200).json(
    new ApiResponse(
      200,
      orders,
      "Orders fetched successfully."
    )
  );
});

const getOrderByIdAdmin = asyncHandler(async (req, res) => {
  // 1. Read order ID
  const { orderId } = req.params;

  // 2. Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new ApiError(400, "Invalid order ID.");
  }

  // 3. Find order
  const order = await Order.findById(orderId)
    .populate("userId", "fullName email");

  if (!order) {
    throw new ApiError(404, "Order not found.");
  }

  // 4. Return response
  return res.status(200).json(
    new ApiResponse(
      200,
      order,
      "Order fetched successfully."
    )
  );
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  // 1. Read order ID & status
  const { orderId } = req.params;
  const { orderStatus } = req.body;

  // 2. Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new ApiError(400, "Invalid order ID.");
  }

  // 3. Validate status
  const validStatuses = [
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ];

  if (!validStatuses.includes(orderStatus)) {
    throw new ApiError(400, "Invalid order status.");
  }

  // 4. Find order
  const order = await Order.findById(orderId);

  if (!order) {
    throw new ApiError(404, "Order not found.");
  }

  // 5. Update status
  order.orderStatus = orderStatus;

  // 6. Save
  await order.save();

  // 7. Return response
  return res.status(200).json(
    new ApiResponse(
      200,
      order,
      "Order status updated successfully."
    )
  );
});

export {createOrder, getMyOrders,getOrderById,cancelOrder, getAllOrders, getOrderByIdAdmin, updateOrderStatus}