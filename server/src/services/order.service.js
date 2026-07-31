import mongoose from "mongoose";
import { Address } from "../models/Address.model.js";
import { ApiError } from "../utils/ApiError.js";

import { Product } from "../models/Product.model.js";

const validateAddress = async (addressId, userId) => {
  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(addressId)) {
    throw new ApiError(400, "Invalid address ID.");
  }

  // Find address
  const address = await Address.findById(addressId);

  if (!address) {
    throw new ApiError(404, "Address not found.");
  }

  // Verify ownership
  if (address.userId.toString() !== userId.toString()) {
    throw new ApiError(
      403,
      "You are not authorized to use this address."
    );
  }

  return address;
};

const buildOrderItems = async (cartItems) => {
  const orderItems = [];
  let subtotal = 0;

  for (const cartItem of cartItems) {
    // Find product
    const product = await Product.findById(cartItem.productId);

    if (!product) {
      throw new ApiError(404, "Product not found.");
    }

    // Find variant
    const variant = product.variants.id(cartItem.variantId);

    if (!variant) {
      throw new ApiError(404, "Variant not found.");
    }

    // Check stock
    if (variant.stock < cartItem.quantity) {
      throw new ApiError(
        400,
        `${product.name} has insufficient stock.`
      );
    }

    // Calculate item subtotal
    const itemSubtotal = variant.price * cartItem.quantity;

    // Build order snapshot
    orderItems.push({
      productId: product._id,
      variantId: variant._id,
      productName: product.name,
      thumbnail: product.thumbnail,
      color: variant.color,
      size: variant.size,
      quantity: cartItem.quantity,
      unitPrice: variant.price,
      subTotal: itemSubtotal,
    });

    subtotal += itemSubtotal;
  }

  return {
    orderItems,
    subtotal,
  };
};


const calculateTotals = (
  subtotal,
  discount = 0,
  shippingFee = 0
) => {
  if (subtotal < 0) {
    throw new Error("Subtotal cannot be negative.");
  }

  if (discount < 0) {
    throw new Error("Discount cannot be negative.");
  }

  if (shippingFee < 0) {
    throw new Error("Shipping fee cannot be negative.");
  }

  const totalAmount = subtotal - discount + shippingFee;

  return {
    subtotal,
    discount,
    shippingFee,
    totalAmount,
  };
};


const generateOrderNumber = () => {
  return `ORD-${Date.now()}`;
};


const updateInventory = async (orderItems) => {
  for (const item of orderItems) {
    const product = await Product.findById(item.productId);

    if (!product) {
      throw new ApiError(404, "Product not found.");
    }

    const variant = product.variants.id(item.variantId);

    if (!variant) {
      throw new ApiError(404, "Variant not found.");
    }

    // Extra safety check
    if (variant.stock < item.quantity) {
      throw new ApiError(
        400,
        `${product.name} has insufficient stock.`
      );
    }

    // Reduce stock
    variant.stock -= item.quantity;

    await product.save();
  }
};

const restoreInventory = async (orderItems) => {
  for (const item of orderItems) {
    const product = await Product.findById(item.productId);

    if (!product) {
      throw new ApiError(404, "Product not found.");
    }

    const variant = product.variants.id(item.variantId);

    if (!variant) {
      throw new ApiError(404, "Variant not found.");
    }

    variant.stock += item.quantity;

    await product.save();
  }
};


export {validateAddress,buildOrderItems,calculateTotals,generateOrderNumber,updateInventory,restoreInventory}  