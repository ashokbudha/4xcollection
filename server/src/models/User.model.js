import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName:{
    type:String,
    required:[true, "Full Name is required."],
    trim:true,
  },
  email:{
    type:String,
    required:[true,"Email is required."],
    trim:true,
    unique:true,
    lowercase:true,
    index:true,
  },
  password:{
    type:String,
    required:[true, "Password is required."],
    select:false,
  },
  phone:{
    type:String,
    required:[true,"Phone is required."],
    trim:true,
    unique:true,
  },
  avatar:{
    type:String,
    default:null,
  },
  role:{
    type:String,
    enum:["user","admin"],
    default:"user",
  },
  isVerified:{
    type:Boolean,
    default:false,
  },
  refreshToken:{
    type:String,
    default:null,
    select:false,
  }

},{timestamps:true});

export const User = mongoose.model("User",userSchema);