import mongoose from "mongoose";
import slugify from "slugify";

const productSchema = new mongoose.Schema({
  categoryId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Category",
    required:[true, "Category is required."],
  },
  name:{
    type:String,
    required:[true, "Product name is required."],
    trim:true,
    index:true,
  },
  slug:{
    type:String,
    unique:true,
    index:true,
  },
  description:{
    type:String,
    trim:true,
  },
  brand:{
    type:String,
    trim:true,
    default:null,
  },
  thumbnail:{
    type:String,
    default:null,
  },
  rating:{
    type:Number,
    default:0,
    min:[0, "Rating cannot be less than 0."],
    max:[5, "Rating cannot be greater than 5."],
  },
  reviewCount:{
    type:Number,
    default:0,
  },
  featured:{
    type:Boolean,
    default:false,
  },
  status:{
    type:String,
    enum:["active", "draft","archived"],
    default:"draft",
  },
  isActive:{
    type:Boolean,
    default:true,
  }
},{timestamps:true})

// auto generate slug from name
productSchema.pre("save", function (next){
if(this.isModified("name")){
  this.slug = slugify(this.name,{lower:true,strict:true})
}
next();
})

export const Product = mongoose.model("Product",productSchema);