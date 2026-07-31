import mongoose from "mongoose";
import slugify from "slugify";
import { PRODUCT_STATUS } from "../constants.js";

const productVariantSchema = new mongoose.Schema(
  {
    price: {
      type: Number,
      required: [true, "Price is required."],
      min: [0, "Price cannot be negative."],
    },
    comparePrice: {
      type: Number,
      default: null,
      min: [0, "Compare price cannot be negative."],
    },
    color: {
      type: String,
      trim: true,
      default: null,
    },
    size: {
      type: String,
      trim: true,
      default: null,
    },
    sku: {
      type: String,
      required: [true, "Sku is required."],
      trim: true,
      uppercase: true,
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, "Stock cannot be negative."],
    },
    Variantimages: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required."],
      index:true,
    },
    name: {
      type: String,
      required: [true, "Product name is required."],
      trim: true,
      index: true,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    description: {
      type: String,
      trim: true,
    },
    brand: {
      type: String,
      trim: true,
      default: null,
    },
    thumbnail: {
      type: String,
      default: null,
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, "Rating cannot be less than 0."],
      max: [5, "Rating cannot be greater than 5."],
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: PRODUCT_STATUS,
      default: "active",
    },
    variants: {
      type: [productVariantSchema],
      default:[],
      validate: {
        validator: function (value) {
          return value.length > 0;
        },
        message: "At least one product variant is required.",
      },
    },
  },
  { timestamps: true }
);

// auto generate slug from name
productSchema.pre("save", function () {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
});

export const Product = mongoose.model("Product", productSchema);
