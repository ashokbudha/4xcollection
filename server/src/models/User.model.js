import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:[true,"username is required."],
    unique:true,
    lowercase:true,
    trim:true,
    index:true,
    minlength: 3,
    maxlength: 30,
  },
  fullName:{
    type:String,
    required:[true, "Full Name is required."],
    trim:true,
    minlength: 2,
    maxlength: 100,
  },
  email:{
    type:String,
    required:[true,"Email is required."],
    trim:true,
    unique:true,
    lowercase:true,
    index:true,
    match: [
  /^\S+@\S+\.\S+$/,
  "Please enter a valid email address."
],
  },
  password:{
    type:String,
    required:[true, "Password is required."],
    select:false,
    minlength:8,
  },
  phone:{
    type:String,
    required:[true,"Phone is required."],
    trim:true,
    unique:true,
    match: [/^[0-9]{10}$/, "Phone number must be exactly 10 digits."],
  },
  avatar:{
    type:String,
    default:"",
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

userSchema.pre("save", async function (next){
  if(!this.isModified("password"))  return next();   //to make sure it encrypt password only when password is modified in userSchema

    this.password = await bcrypt.hash(this.password,10)
  next();
} )

userSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
  return jwt.sign({
    _id :this._id,
    email: this.email,
    fullName: this.fullName,
    role: this.role,
  },
  process.env.ACCESS_TOKEN_SECRET,
  {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
  }
)

}

userSchema.methods.generateRefreshToken = function(){
  return jwt.sign({
    _id :this._id,
  },
  process.env.REFRESH_TOKEN_SECRET,
  {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY
  }
)  
}

export const User = mongoose.model("User",userSchema);