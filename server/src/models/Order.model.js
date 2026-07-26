import mongoose from "mongoose";

const shippingAddressSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "fullname is required."],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "phone is required."],
      trim: true,
    },
    province: {
      type: String,
      required: [true, "province is required."],
      trim: true,
    },
    district: {
      type: String,
      required: [true, "district is required."],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "city is required."],
      trim: true,
    },
    street: {
      type: String,
      required: [true, "street is required."],
      trim: true,
    },
    landmark: {
      type: String,
      default: null,
      trim: true,
    },
    postalCode: {
      type: String,
      default: null,
      trim: true,
    },
  },
  { _id: false }
);

const orderItemSchema = new mongoose.Schema(
  {
    variantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductVariant",
      required: [true, "Product Variant is required."],
    },
    productName: {
      type: String,
      trim: true,
      required: [true, "Product Name is required."],
    },
    thumbnail: {
      type: String,
      required: [true, "Thumbnail is required."],
    },
    color: {
      type: String,
      default: null,
      trim: true,
    },
    size: {
      type: String,
      default: null,
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required."],
      min: [1, "Quantity must be atleast 1."],
    },
    unitPrice: {
      type: Number,
      required: [true, "Unit Price is required."],
      min: [0, "Price cannot be negative."],
    },
    subTotal: {
      type: Number,
      required: [true, "subtotal is required."],
      min: [0, "Sub Total cannot be negative."],
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
      required: [true, "User is required."],
    },
    orderNumber: {
      type: String,
      unique: true,
      required: [true, "Order number is required."],
    },
    items: {
      type: [orderItemSchema],
      default: [],
    },
    shippingAddress: {
      type: shippingAddressSchema,
      required: [true, "shipping address is required."],
    },
    subtotal: {
      type: Number,
      required: [true, "subtotal is required."],
      min: [0, "subtotal cannot be negative"],
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, "discount cannot be negative."],
    },
    shippingFee: {
      type: Number,
      default: 0,
      min: [0, "shipping fee cannot be negative."],
    },
    totalAmount: {
      type: Number,
      required: [true, "total is required."],
      min: [0, "total cannot be negative."],
    },
    paymentMethod: {
      type: String,
      enum: ["cod", "esewa", "khalti"],
      required: [true, "Payment method is required."],
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "failed", "paid", "refunded"],
      default: "pending",
    },
    orderStatus: {
      type: String,
      enum: ["pending", "shipped", "processing", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
