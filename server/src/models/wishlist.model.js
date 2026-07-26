import mongoose from "mongoose";

const wishListItemSchema = new mongoose.Schema({
  variantId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"ProductVariant",
    required:[true,"Product Variant is required."],
  },
  createdAt:{
    type:Date,
    default:Date.now,
  },

},{_id:false});
const wishListSchema = new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    index:true,
    unique:true,
    required:[true,"User is required."],
  },
  items:{
    type:[wishListItemSchema],
    default:[],
  },

},{timestamps:true});

export const WishList = mongoose.model("WishList",wishListSchema);