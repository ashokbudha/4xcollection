import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Category } from "../models/Category.model.js";
import mongoose from "mongoose";
import { Product } from "../models/Product.model.js";
import { Cart } from "../models/Cart.model.js";

const addToCart = asyncHandler(async (req, res) => {
  // ========= MVP =========
  // 1. Read request data
  // 2. Validate required fields
  // 3. Validate product ID
  // 4. Check product exists
  // 5. Validate variant ID
  // 6. Check variant exists
  // 7. Check stock availability
  // 8. Get or create user's cart
  // 9. Check if item already exists
  // 10. Increase quantity OR add new item
  // 11. Save cart
  // 12. Return response

  // ===== TODO =====
  // Validate maximum quantity
  // Apply promotions
  // Reserve stock

  // 1. Read request data
  const { productId, variantId, quantity } = req.body;
  const userId = req.user._id;

  // 2. Validate required fields
  if (!productId || !variantId || quantity == null) {
    throw new ApiError(
      400,
      "Product, variant and quantity are required."
    );
  }

  // 3. Validate product ID
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new ApiError(400, "Invalid product ID.");
  }

  // 4. Check product exists
  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(404, "Product not found.");
  }

  // 5. Validate variant ID
  if (!mongoose.Types.ObjectId.isValid(variantId)) {
    throw new ApiError(400, "Invalid variant ID.");
  }

  // 6. Check variant exists
  const variant = product.variants.id(variantId);

  if (!variant) {
    throw new ApiError(404, "Variant not found.");
  }

  // 7. Check stock availability
  if (quantity < 1) {
    throw new ApiError(
      400,
      "Quantity must be at least 1."
    );
  }

  if (quantity > variant.stock) {
    throw new ApiError(
      400,
      "Requested quantity exceeds available stock."
    );
  }

  // 8. Get or create user's cart
  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = await Cart.create({
      userId,
      items: [],
    });
  }

  // 9. Check if item already exists
  const existingItem = cart.items.find(
    (item) =>
      item.productId.toString() === productId &&
      item.variantId.toString() === variantId
  );

  // 10. Increase quantity OR add new item
  if (existingItem) {
    existingItem.quantity += quantity;

    if (existingItem.quantity > variant.stock) {
      throw new ApiError(
        400,
        "Requested quantity exceeds available stock."
      );
    }
  } else {
    cart.items.push({
      productId,
      variantId,
      quantity,
    });
  }

  // 11. Save cart
  await cart.save();

  // 12. Return response
  return res.status(200).json(
    new ApiResponse(
      200,
      cart,
      "Product added to cart successfully."
    )
  );



});

const getCart = asyncHandler(async (req, res) => {
  // ========= MVP =========
  // 1. Get logged-in user
  // 2. Find user's cart
  // 3. Populate product details
  // 4. Return cart

  // ===== TODO =====
  // Calculate subtotal
  // Calculate taxes
  // Calculate discounts
  // Calculate shipping

  // 1. Get logged-in user
  const userId = req.user._id;

  // 2. Find user's cart
  const cart = await Cart.findOne({ userId })
    .populate({
      path: "items.productId",
      populate: {
        path: "categoryId",
        select: "name slug",
      },
    });

  // 3. Return empty cart if it doesn't exist
  if (!cart) {
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          items: [],
        },
        "Cart is empty."
      )
    );
  }

  // 4. Return cart
  return res.status(200).json(
    new ApiResponse(
      200,
      cart,
      "Cart fetched successfully."
    )
  );
});

const updateCartItem = asyncHandler(async (req, res) => {
  // ========= MVP =========
  // 1. Read cart item ID
  // 2. Read quantity
  // 3. Validate item ID
  // 4. Validate quantity
  // 5. Get user's cart
  // 6. Check item exists
  // 7. Check stock availability
  // 8. Update quantity
  // 9. Save cart
  // 10. Return response

  // ===== TODO =====
  // Auto remove when quantity becomes zero

  // 1. Read cart item ID
  const { itemId } = req.params;

  // 2. Read quantity
  const { quantity } = req.body;

  // 3. Validate item ID
  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    throw new ApiError(400, "Invalid cart item ID.");
  }

  // 4. Validate quantity
  const parsedQuantity = Number(quantity);

  if (!Number.isInteger(parsedQuantity) || parsedQuantity < 1) {
    throw new ApiError(
      400,
      "Quantity must be a positive integer."
    );
  }

  // 5. Get user's cart
  const cart = await Cart.findOne({ userId: req.user._id });

  if (!cart) {
    throw new ApiError(404, "Cart not found.");
  }

  // 6. Check item exists
  const item = cart.items.id(itemId);

  if (!item) {
    throw new ApiError(404, "Cart item not found.");
  }

  // 7. Check stock availability
  const product = await Product.findById(item.productId);

  if (!product) {
    throw new ApiError(404, "Product not found.");
  }

  const variant = product.variants.id(item.variantId);

  if (!variant) {
    throw new ApiError(404, "Variant not found.");
  }

  if (parsedQuantity > variant.stock) {
    throw new ApiError(
      400,
      "Requested quantity exceeds available stock."
    );
  }

  // 8. Update quantity
  item.quantity = parsedQuantity;

  // 9. Save cart
  await cart.save();

  // 10. Return response
  return res.status(200).json(
    new ApiResponse(
      200,
      cart,
      "Cart updated successfully."
    )
  );
});


const removeCartItem = asyncHandler(async (req, res) => {
  // ========= MVP =========
  // 1. Read cart item ID
  // 2. Validate item ID
  // 3. Get user's cart
  // 4. Check item exists
  // 5. Remove item
  // 6. Save cart
  // 7. Return response

  // 1. Read cart item ID
  const { itemId } = req.params;

  // 2. Validate item ID
  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    throw new ApiError(400, "Invalid cart item ID.");
  }

  // 3. Get user's cart
  const cart = await Cart.findOne({ userId: req.user._id });

  if (!cart) {
    throw new ApiError(404, "Cart not found.");
  }

  // 4. Check item exists
  const item = cart.items.id(itemId);

  if (!item) {
    throw new ApiError(404, "Cart item not found.");
  }

  // 5. Remove item
  item.deleteOne();

  // 6. Save cart
  await cart.save();

  // 7. Return response
  return res.status(200).json(
    new ApiResponse(
      200,
      cart,
      "Cart item removed successfully."
    )
  );
});

const clearCart = asyncHandler(async (req, res) => {
  // ========= MVP =========
  // 1. Get user's cart
  // 2. Remove all items
  // 3. Save cart
  // 4. Return response

  // 1. Get user's cart
  const cart = await Cart.findOne({ userId: req.user._id });

  if (!cart) {
    throw new ApiError(404, "Cart not found.");
  }

  // 2. Remove all items
  cart.items = [];

  // 3. Save cart
  await cart.save();

  // 4. Return response
  return res.status(200).json(
    new ApiResponse(
      200,
      cart,
      "Cart cleared successfully."
    )
  );
});


export {addToCart,getCart, updateCartItem,removeCartItem,clearCart}