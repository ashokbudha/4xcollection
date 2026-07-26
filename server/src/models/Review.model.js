import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  productId: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Product",
    required:[true,"Product is required."],
    index:true,
  },
  userId: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:[true,"User is required."],
    index:true,
  },
  rating:{
    type:Number,
    required:[true,"Rating is required."],
    min:[0, "Minimun rating is 0."],
    max:[5,"Maximun rating is 5."],
  },
  comment:{
    type:String,
    trim: true,
    maxlength: [1000, "Comment cannot exceed 1000 characters."]
  },
    isVerifiedPurchase: {
      type: Boolean,
      default: false,
    },
},{timestamps:true})

// One review per user per product
reviewSchema.index(
  { productId: 1, userId: 1 },
  { unique: true }
);

export const Review = mongoose.model("Review", reviewSchema);