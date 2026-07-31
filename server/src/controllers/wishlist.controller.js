import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Category } from "../models/Category.model.js";
import mongoose from "mongoose";
import { Product } from "../models/Product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Wishlist } from "../models/wishlist.model.js";


const addToWishlist = asyncHandler(async (req, res) => {
  // ========= MVP =========
  // 1. Read request data
  // 2. Validate required fields
  // 3. Validate product ID
  // 4. Check product exists
  // 5. Validate variant ID
  // 6. Check variant exists
  // 7. Get or create user's wishlist
  // 8. Check if item already exists
  // 9. Add item to wishlist
  // 10. Save wishlist
  // 11. Return response

  // ===== TODO =====
  // Maximum wishlist size

  // 1. Read request data
  const { productId, variantId } = req.body;
  const userId = req.user._id;

  // 2. Validate required fields
  if (!productId || !variantId) {
    throw new ApiError(
      400,
      "Product and variant are required."
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

  // 7. Get or create user's wishlist
  let wishlist = await Wishlist.findOne({ userId });

  if (!wishlist) {
    wishlist = await Wishlist.create({
      userId,
      items: [],
    });
  }

  // 8. Check if item already exists
  const existingItem = wishlist.items.find(
    (item) =>
      item.productId.toString() === productId &&
      item.variantId.toString() === variantId
  );

  if (existingItem) {
    throw new ApiError(
      409,
      "Item already exists in wishlist."
    );
  }

  // 9. Add item to wishlist
  wishlist.items.push({
    productId,
    variantId,
  });

  // 10. Save wishlist
  await wishlist.save();

  // 11. Return response
  return res.status(201).json(
    new ApiResponse(
      201,
      wishlist,
      "Item added to wishlist successfully."
    )
  );
});


const getWishlist = asyncHandler(async (req, res) => {
  // ========= MVP =========
  // 1. Get logged-in user
  // 2. Find user's wishlist
  // 3. Populate product details
  // 4. Return wishlist

  // 1. Get logged-in user
  const userId = req.user._id;

  // 2. Find user's wishlist
  const wishlist = await Wishlist.findOne({ userId }).populate({
    path: "items.productId",
    populate: {
      path: "categoryId",
      select: "name slug",
    },
  });

  // 3. Return empty wishlist if it doesn't exist
  if (!wishlist) {
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          items: [],
        },
        "Wishlist is empty."
      )
    );
  }

  // 4. Return wishlist
  return res.status(200).json(
    new ApiResponse(
      200,
      wishlist,
      "Wishlist fetched successfully."
    )
  );
});


const removeFromWishlist = asyncHandler(async (req, res) => {
  // ========= MVP =========
  // 1. Read wishlist item ID
  // 2. Validate item ID
  // 3. Get user's wishlist
  // 4. Check item exists
  // 5. Remove item
  // 6. Save wishlist
  // 7. Return response

  // 1. Read wishlist item ID
  const { itemId } = req.params;

  // 2. Validate item ID
  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    throw new ApiError(400, "Invalid wishlist item ID.");
  }

  // 3. Get user's wishlist
  const wishlist = await Wishlist.findOne({
    userId: req.user._id,
  });

  if (!wishlist) {
    throw new ApiError(404, "Wishlist not found.");
  }

  // 4. Check item exists
  const item = wishlist.items.id(itemId);

  if (!item) {
    throw new ApiError(404, "Wishlist item not found.");
  }

  // 5. Remove item
  item.deleteOne();

  // 6. Save wishlist
  await wishlist.save();

  // 7. Return response
  return res.status(200).json(
    new ApiResponse(
      200,
      wishlist,
      "Item removed from wishlist successfully."
    )
  );
});



const clearWishlist = asyncHandler(async (req, res) => {
  // ========= MVP =========
  // 1. Get user's wishlist
  // 2. Remove all items
  // 3. Save wishlist
  // 4. Return response

  // 1. Get user's wishlist
  const wishlist = await Wishlist.findOne({
    userId: req.user._id,
  });

  if (!wishlist) {
    throw new ApiError(404, "Wishlist not found.");
  }

  // 2. Remove all items
  wishlist.items = [];

  // 3. Save wishlist
  await wishlist.save();

  // 4. Return response
  return res.status(200).json(
    new ApiResponse(
      200,
      wishlist,
      "Wishlist cleared successfully."
    )
  );
});


export {addToWishlist, getWishlist, removeFromWishlist, clearWishlist}