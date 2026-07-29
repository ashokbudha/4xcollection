import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";
import { Product } from "../models/Product.model.js";
import { Category } from "../models/category.model.js";
import { compare } from "bcrypt";
import { PRODUCT_STATUS } from "../constants.js";

const createProduct = asyncHandler(async (req, res) => {
  // 1. Request
  // 2. Validate required fields
  // 3. Parse variants JSON
  // 4. Validate every variant
  // 5. Check duplicate SKUs in request
  // 6. Check category exists
  // 7. Check product name uniqueness
  // 8. Check SKU uniqueness in database
  // 9. Validate uploaded files
  // 10. Upload thumbnail
  // 11. Upload variant images
  // 12. Map images to variants
  // 13. Create product object
  // 14. Return 201 Created

  //1. Request

  const { categoryId, name, description, brand, variants, featured, status } =
    req.body;

  const thumbnailFile = req.files?.thumbnail?.[0];
  const variantImageFiles = req.files?.variantImages || [];

  //2. Validate Required Fields

  if (!categoryId || !name?.trim() || !variants) {
    throw new ApiError(400, "All required fields must be provided.");
  }

  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    throw new ApiError(400, "Invalid category id.");
  }

  let parsedFeatured = featured;

  if (featured !== undefined) {
    if (featured === "true") parsedFeatured = true;
    else if (featured === "false") parsedFeatured = false;
    else {
      throw new ApiError(400, "Featured must be true or false.");
    }
  }

  const allowedStatus = PRODUCT_STATUS;

  if (status !== undefined && !allowedStatus.includes(status)) {
    throw new ApiError(400, "Invalid product status.");
  }

  //3. Parse Variants JSON
  let parsedVariants;

  try {
    parsedVariants = JSON.parse(variants);
  } catch (error) {
    throw new ApiError(400, "Invalid variants format.");
  }

  if (!Array.isArray(parsedVariants) || parsedVariants.length === 0) {
    throw new ApiError(400, "At least one product variant is required.");
  }

  //4. Validate Every Variant

  parsedVariants.forEach((variant, index) => {
    const { color, size, price, comparePrice, stock, sku, imageIndexes } =
      variant;

    // Required fields
    if (!size?.trim()) {
      throw new ApiError(400, `Variant ${index + 1}: size is required.`);
    }

    if (!sku?.trim()) {
      throw new ApiError(400, `Variant ${index + 1}: SKU is required.`);
    }

    // Convert numeric values
    const numericPrice = Number(price);
    const numericStock = Number(stock);
    const numericComparePrice =
      comparePrice != null ? Number(comparePrice) : null;

    // Price validation
    if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
      throw new ApiError(
        400,
        `Variant ${index + 1}: price must be greater than 0.`
      );
    }

    // Stock validation
    if (!Number.isInteger(numericStock) || numericStock < 0) {
      throw new ApiError(
        400,
        `Variant ${index + 1}: stock must be a non-negative integer.`
      );
    }

    // Compare price validation
    if (
      numericComparePrice !== null &&
      (!Number.isFinite(numericComparePrice) ||
        numericComparePrice < numericPrice)
    ) {
      throw new ApiError(
        400,
        `Variant ${index + 1}: compare price must be greater than or equal to price.`
      );
    }

    // Image indexes validation
    if (!Array.isArray(imageIndexes) || imageIndexes.length === 0) {
      throw new ApiError(
        400,
        `Variant ${index + 1}: at least one image is required.`
      );
    }

    if (!imageIndexes.every((i) => Number.isInteger(i) && i >= 0)) {
      throw new ApiError(
        400,
        `Variant ${index + 1}: image indexes must be non-negative integers.`
      );
    }

    // Prevent duplicate image indexes
    if (new Set(imageIndexes).size !== imageIndexes.length) {
      throw new ApiError(
        400,
        `Variant ${index + 1}: duplicate image indexes are not allowed.`
      );
    }
  });

  //5. Check Duplicate SKUs

  const skuSet = new Set();

  for (const variant of parsedVariants) {
    const normalizedSku = variant.sku.trim().toUpperCase();

    if (skuSet.has(normalizedSku)) {
      throw new ApiError(
        400,
        `Duplicate SKU "${variant.sku}" found in request.`
      );
    }

    skuSet.add(normalizedSku);
  }

  //6. Check Category Exists

  const category = await Category.findById(categoryId);

  if (!category) {
    throw new ApiError(404, "Category not found.");
  }

  //7. Check Product Name Uniqueness

  const existingProduct = await Product.findOne({
    name: name.trim().toLowerCase(),
  });

  if (existingProduct) {
    throw new ApiError(409, "Product with this name already exists.");
  }

  //8. Check SKU Uniqueness

  const skuList = parsedVariants.map((variant) =>
    variant.sku.trim().toUpperCase()
  );

  const existingSku = await Product.findOne({
    "variants.sku": {
      $in: skuList,
    },
  });

  if (existingSku) {
    throw new ApiError(409, "One or more SKUs already exist.");
  }

  //9. Validate Uploaded Files

  if (!thumbnailFile) {
    throw new ApiError(400, "Product thumbnail is required.");
  }

  if (variantImageFiles.length === 0) {
    throw new ApiError(400, "At least one variant image is required.");
  }

  //10. Upload thumbnail...
  const thumbnailLocalPath = thumbnailFile.path;

  const uploadedThumbnail = await uploadOnCloudinary(thumbnailLocalPath);

  if (!uploadedThumbnail?.url) {
    throw new ApiError(500, "Failed to upload product thumbnail.");
  }

  //11. Upload variant images...
  //todo: Upload images in parallel
  const uploadedVariantImages = [];

  for (const file of variantImageFiles) {
    const uploadedImage = await uploadOnCloudinary(file.path);

    if (!uploadedImage?.url) {
      throw new ApiError(500, "Failed to upload variant image.");
    }

    uploadedVariantImages.push(uploadedImage.url);
  }

  //12. Map images...
  const mappedVariants = parsedVariants.map((variant) => {
    const images = variant.imageIndexes.map((index) => {
      if (index < 0 || index >= uploadedVariantImages.length) {
        throw new ApiError(
          400,
          `Invalid image index ${index} for SKU ${variant.sku}`
        );
      }

      return uploadedVariantImages[index];
    });

    return {
      color: variant.color,
      size: variant.size,
      price: Number(variant.price),
      stock: Number(variant.stock),
      comparePrice:
        variant.comparePrice != null ? Number(variant.comparePrice) : undefined,
      sku: variant.sku.trim().toUpperCase(),
      images,
    };
  });

  //13. Create product...
  const product = await Product.create({
    categoryId,
    name: name.trim(),
    description: description?.trim(),
    brand: brand?.trim(),
    featured: parsedFeatured,
    status,
    thumbnail: uploadedThumbnail.url,
    variants: mappedVariants,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, product, "Product created successfully."));
});

const getAllProducts = asyncHandler(async (req, res) => {
 
  // ==========
  // 1. Read page & limit from query
  // 2. Validate page & limit
  // 3. Calculate skip value
  // 4. Get products from database
  // 5. Populate category details
  // 6. Return paginated response

  // ===== TODO (Future) =====
  // 7. Search by product name
  // 8. Filter by category
  // 9. Filter by brand
  // 10. Filter by featured
  // 11. Filter by status
  // 12. Filter by price range
  // 13. Sort by newest/oldest
  // 14. Sort by price
  // 15. Sort by popularity
  // 16. Filter by stock availability
  // 17. Return pagination metadata
  // 18. Optimize query performance


    // 1. Read page & limit
    const { page = 1, limit = 10 } = req.query;

    // 2. Validate page & limit
    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    if (!Number.isInteger(pageNumber) || pageNumber < 1) {
        throw new ApiError(400, "Page must be a positive integer.");
    }

    if (!Number.isInteger(limitNumber) || limitNumber < 1) {
        throw new ApiError(400, "Limit must be a positive integer.");
    }
    if (limitNumber > 100) {
  throw new ApiError(400, "Limit cannot exceed 100.");
}

    // 3. Calculate skip
    const skip = (pageNumber - 1) * limitNumber;


//  4. Get products from database
  const products = await Product.find()
  .populate("categoryId", "name slug")
  .sort({ createdAt: -1 })
  .skip(skip)
  .limit(limitNumber);

 // 5. Return response
  return res.status(200).json(
  new ApiResponse(
    200,
    {
      page: pageNumber,
      limit: limitNumber,
      products,
    },
    "Products fetched successfully."
  )
);



});

const getProductById = asyncHandler(async (req, res) => {
    // ========= MVP =========

  // 1. Read product ID from request
  // 2. Validate product ID
  // 3. Get product from database
  // 4. Populate category details
  // 5. Check product exists
  // 6. Return response

  // ===== TODO (Future) =====

  // 7. Increment product view count
  // 8. Populate product reviews
  // 9. Populate average rating
  // 10. Populate related products
  // 11. Populate recommended products
  // 12. Check wishlist status
  // 13. Check cart status
  // 14. Return stock availability by variant

   // 1. Read product ID
  const { productId } = req.params;

  // 2. Validate product ID
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new ApiError(400, "Invalid product ID.");
  }

  // 3 & 4. Get product and populate category
  const product = await Product.findById(productId).populate(
    "categoryId",
    "name slug"
  );

  // 5. Check product exists
  if (!product) {
    throw new ApiError(404, "Product not found.");
  }

  // 6. Return response
  return res.status(200).json(
    new ApiResponse(
      200,
      product,
      "Product fetched successfully."
    )
  );

});

const updateProduct = asyncHandler(async (req, res) => {
  // ========= MVP =========

  // 1. Read product ID and request data
  // 2. Validate product ID
  // 3. Check product exists
  // 4. Validate request data
  // 5. Check category exists (if category is being updated)
  // 6. Check product name uniqueness (if name is being updated)
  // 7. Check SKU uniqueness (if variants are being updated)
  // 8. Upload new images (if provided)
  // 9. Update product
  // 10. Return updated product

  // ===== TODO (Future) =====

  // 11. Delete old Cloudinary images
  // 12. Support partial variant updates
  // 13. Add/remove variants individually
  // 14. Track update history
  // 15. Update product slug automatically
  // 16. Bulk update products
  // 17. Optimistic concurrency/version control

   // 1. Read request
  const { productId } = req.params;

  const {
    categoryId,
    name,
    description,
    brand,
    featured,
    status,
  } = req.body;

  // 2. Validate product ID
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new ApiError(400, "Invalid product ID.");
  }

  // 3. Check product exists
  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(404, "Product not found.");
  }

  // 4. Validate request data

  if (
    featured !== undefined &&
    typeof featured !== "boolean"
  ) {
    throw new ApiError(400, "Featured must be boolean.");
  }

  if (
    status !== undefined &&
    !PRODUCT_STATUS.includes(status)
  ) {
    throw new ApiError(400, "Invalid product status.");
  }

  // 5. Check category exists
  if (categoryId) {
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      throw new ApiError(400, "Invalid category ID.");
    }

    const category = await Category.findById(categoryId);

    if (!category) {
      throw new ApiError(404, "Category not found.");
    }
  }

  // 6. Check product name uniqueness
  if (name) {
    const existingProduct = await Product.findOne({
      _id: { $ne: productId },
      name: name.trim(),
    });

    if (existingProduct) {
      throw new ApiError(
        409,
        "Product with this name already exists."
      );
    }
  }

  // 7. Update product
  if (categoryId) product.categoryId = categoryId;

  if (name) product.name = name.trim();

  if (description !== undefined)
    product.description = description.trim();

  if (brand !== undefined)
    product.brand = brand.trim();

  if (featured !== undefined)
    product.featured = featured;

  if (status !== undefined)
    product.status = status;

  await product.save();

  // 8. Return response
  return res.status(200).json(
    new ApiResponse(
      200,
      product,
      "Product updated successfully."
    )
  );


});
const deleteProduct = asyncHandler(async (req, res) => {
  // ========= MVP =========
  // 1. Read product ID
  // 2. Validate product ID
  // 3. Check product exists
  // 4. Permanently delete product
  // 5. Return response

  // ===== TODO (Future) =====
  // Soft delete product
  // Delete Cloudinary images
  // Archive product
  // Restore deleted product

  // 1. Read product ID
  const { productId } = req.params;

  // 2. Validate product ID
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new ApiError(400, "Invalid product ID.");
  }

  // 3. Check product exists
  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(404, "Product not found.");
  }

  // 4. Permanently delete
    await Product.findByIdAndDelete(productId);

  await product.save();

  // 5. Return response
  return res.status(200).json(
    new ApiResponse(
      200,
      null,
      "Product deleted successfully."
    )
  );
});

export {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
