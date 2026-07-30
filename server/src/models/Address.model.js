import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required."],
    index: true,
  },
  fullName: {
    type: String,
    required: [true, "fullname is required."],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, "phone is required."],
    trim: true,
  },
  province: {
    type: String,
    required: [true, "province is required."],
    trim: true,
  },
  district: {
    type: String,
    required: [true, "district is required."],
    trim: true,
  },
  city: {
    type: String,
    required: [true, "city is required."],
    trim: true,
  },
  street: {
    type: String,
    required: [true, "street is required."],
    trim: true,
  },
  landmark: {
    type: String,
    default: null,
    trim: true,
  },
  postalCode: {
    type: String,
    default: null,
    trim: true,
  },
  isDefault: {
  type: Boolean,
  default: false,
}
});

export const Address = mongoose.model("Address", addressSchema);
