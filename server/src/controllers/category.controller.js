import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Category } from "../models/Category.model.js";
import mongoose from "mongoose";
import { Product } from "../models/Product.model.js";

const createCategory = asyncHandler(async (req, res) => {
  // 1. Get data from req.body
  // 2. Validate required fields
  // 3. Check if category already exists
  // check if parent category exists
  // 4. Get uploaded image from req.files (if any)
  // 5. Upload image to Cloudinary (if image exists)
  // 6. Create category in MongoDB
  // 7. Return success response

  const { name, parentId } = req.body;

  if (!name?.trim()) {
    throw new ApiError(400, "Category name is required.");
  }

  
  const existingCategory = await Category.findOne({ name: name.toLowerCase() });
  if (existingCategory) {
    throw new ApiError(409, "Category already exists.");
  }
  
  const normalizedParentId = parentId?.trim() ? parentId : null;
  // check if parent category exist
if (normalizedParentId) {
  const parentCategory = await Category.findById(normalizedParentId);

  if (!parentCategory) {
    throw new ApiError(404, "Parent category not found.");
  }
}

  const imageLocalPath = req.files?.imageUrl?.[0]?.path;

  let image = null;
  if (imageLocalPath) {
    image = await uploadOnCloudinary(imageLocalPath);
  }
  if (imageLocalPath && !image) {
    throw new ApiError(500, "Failed to upload Category image.");
  }

  const category = await Category.create({
    name,
    imageUrl: image?.url || null,
    parentId:normalizedParentId,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, category, "Category created Sucsessfully."));
});

const getCategories = asyncHandler(async (req, res) => {
  // read all category
  // filter active category
  // sort category(optional)
  //  return category

  const activeCategories = await Category.find({ isActive: true });

  return res
    .status(200)
    .json(
      new ApiResponse(200, activeCategories, "Categories fetched successfully.")
    );
});

const getCategory = asyncHandler(async (req, res) => {
  // 1. Get category ID from request parameter
  // check if id is valid mongodb id
  // 2. Find category in the database
  // 3. Check if category exists
  // 4. Return category response

  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid category ID.");
  }

  const category = await Category.findById(id);

  if (!category) {
    throw new ApiError(404, "Category not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, category, "Category fetched successfully."));
});

const updateCategory = asyncHandler(async (req, res) => {
  // 1. Get category ID from request parameters
  // 2. Check if the ID is a valid MongoDB ObjectId
  // 3. Get updated data from req.body (and uploaded image if any)
  // 4. Validate the updated data (if provided)
  // 5. Find the category in the database
  // 6. Check if the category exists
  // check the dublicate name
  // 7. Upload new image to Cloudinary (if a new image was uploaded) and delete the old iamge in cloudinary
  // 8. Update the category in the database
  // 9. Return success response

  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid category id.");
  }

  const { name, parentId, isActive } = req.body;
  const imageLocalPath = req.files?.imageUrl?.[0]?.path;

  const normalizedParentId = parentId?.trim() || null;

 if (normalizedParentId) {
  const parentCategory = await Category.findById(normalizedParentId);

  if (normalizedParentId === id) {
  throw new ApiError(400, "A category cannot be its own parent.");
}

  if (!parentCategory) {
    throw new ApiError(404, "Parent category not found.");
  }
}

  if (name && !name.trim()) {
    throw new ApiError(400, "Category name cannot be empty.");
  }

  const category = await Category.findById(id);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  // check duplicate name if name is updating
  if (name && name.toLowerCase() !== category.name.toLowerCase()) {
    const existingCategory = await Category.findOne({
      name: name.toLowerCase(),
      _id: { $ne: id },
    });

    if (existingCategory) {
      throw new ApiError(409, "Category already exists.");
    }
  }

  //upload image if image changed
  let image = null;
  if (imageLocalPath) {
    image = await uploadOnCloudinary(imageLocalPath);

    if (!image) {
      throw new ApiError(500, "Failed to upload category image.");
    }

    //todo: Delete old Cloudinary image here (if you store public_id)

    category.imageUrl = image.url;
  }
if (name) {
  category.name = name.trim();
}

if (parentId !== undefined) {
  category.parentId = normalizedParentId;
}

 if (isActive !== undefined) {
  category.isActive = isActive === "true";
}

  await category.save();

  return res
    .status(200)
    .json(new ApiResponse(200, category, "Category updated successfully."));
});

const deleteCategory = asyncHandler(async (req, res) => {
  // get id 
  // check// 1. Get category ID from request parameters
// 2. Validate the MongoDB ObjectId
// 3. Find the category in the database
// 4. Check if the category exists
// 5. Check whether the category has any child categories
// 6. Check whether any products are using this category
// 7. Delete the category image from Cloudinary (if one exists)
// 8. Delete the category from the database
// 9. Return a success response

const {id} = req.params;

if(!mongoose.Types.ObjectId.isValid(id)){
  throw new ApiError(400,"Category id is invalid.");
}

const category = await Category.findById(id);

if(!category){
  throw new ApiError(404, "Category is not found.");
}

const childCategory =await Category.findOne({parentId:id});

if(childCategory){
  throw new ApiError(400,"Cannot delete category because it has subcategories.");
}

// check wheather the product are using this category
const product = await Product.findOne({categoryId:id});
if(product){
  throw new ApiError(400,"Cannot delete category because it has products");
}

// todo:delete the category image from cloudinary

 await category.deleteOne();
//  await Category.findByIdAndDelete(id);


  return res.status(200).json(
    new ApiResponse(
      200,
      {},
      "Category deleted successfully."
    )
  )


});

export {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
