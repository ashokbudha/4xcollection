import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  variantId:{
    type:mongoose.Schema.Types.ObjectId,
    required:[true, "Product Variant is required."],
  },
   productId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Product",
    required:[true, "Product is required."],
  },
  unitPrice:{
    type:Number,
    required:[true,"Unit Price is required."],
    min:[0, "Unit price cant be negative."],
  },
  quantity:{
    type:Number,
    required:[true, "Quantity is required."],
    default:1,
    min:[1, "Quantity cannot be less than 1."]
  }
})



const cartSchema = new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:[true, "User is required."],
    unique:true,
    index:true,
  },
  items:{
    type:[cartItemSchema],
    default:[],
  },

},{timestamps:true});

export const Cart = mongoose.model("Cart",cartSchema);