import mongoose from "mongoose";

const productVariantSchema = new mongoose.Schema({
  productId : {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Product",
    required:[true,"Product is required."],
    index:true,
  },
  price:{
    type:Number,
    required:[true, "Price is required."],
    min:[0, "Price cannot be negative."],
  },
  comparePrice:{
    type:Number,
    default:null,
    min:[0,"Compare price cannot be negative."],
  },
  color:{
    type:String,
    trim:true,
    default:null,
  },
  size:{
    type:String,
    trim:true,
    default:null,
  },
  sku:{
    type:String,
    required:[true,"Sku is required."],
    unique:true,
    index:true,
    trim:true,
    uppercase:true,
  },
  stock:{
    type:Number,
    default:0,
    min:[0, "Stock cannot be negative."],

  },
  images:{
    type:[String],
    default:[],
  },
},{timestamps:true})

export const ProductVariant = mongoose.model("ProductVariant", productVariantSchema);