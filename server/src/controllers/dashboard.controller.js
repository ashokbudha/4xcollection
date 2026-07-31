import { User } from "../models/User.model.js";
import { Category } from "../models/Category.model.js";
import { Product } from "../models/Product.model.js";
import { Order } from "../models/Order.model.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getDashboardStats = asyncHandler(async (req, res) => {

  // Total Counts
  const totalUsers = await User.countDocuments();

  const totalCategories = await Category.countDocuments();

  const totalProducts = await Product.countDocuments();

  const totalOrders = await Order.countDocuments();

  // Order Status Counts
  const pendingOrders = await Order.countDocuments({
    orderStatus: "pending",
  });

  const processingOrders = await Order.countDocuments({
    orderStatus: "processing",
  });

  const shippedOrders = await Order.countDocuments({
    orderStatus: "shipped",
  });

  const deliveredOrders = await Order.countDocuments({
    orderStatus: "delivered",
  });

  const cancelledOrders = await Order.countDocuments({
    orderStatus: "cancelled",
  });

  // Revenue
  const revenue = await Order.aggregate([
  {
    $match: {
      orderStatus: "delivered",
    },
  },
  {
    $group: {
      _id: null,
      totalRevenue: {
        $sum: "$totalAmount",
      },
    },
  },
]);


  // Recent Orders
  const recentOrders = await Order.find()
    .populate("userId", "fullName email")
    .sort({ createdAt: -1 })
    .limit(5);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        totalUsers,
        totalCategories,
        totalProducts,
        totalOrders,

        pendingOrders,
        processingOrders,
        shippedOrders,
        deliveredOrders,
        cancelledOrders,

        totalRevenue:
          revenue.length > 0
            ? revenue[0].totalRevenue
            : 0,

        recentOrders,
      },
      "Dashboard statistics fetched successfully."
    )
  );
});

export { getDashboardStats };