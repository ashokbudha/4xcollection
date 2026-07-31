import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Address } from "../models/Address.model.js";

const addAddress = asyncHandler(async (req, res) => {
  // ========= MVP =========
  // 1. Read request data
  // 2. Validate required fields
  // 3. Validate phone number
  // 4. Check if default address already exists
  // 5. If new address is default, remove default from others
  // 6. Create address
  // 7. Return response

  // ===== TODO =====
  // Nepal province/district validation

  // 1. Read request data
  const {
    fullName,
    phone,
    province,
    district,
    city,
    street,
    landmark,
    postalCode,
    isDefault = false,
  } = req.body;

  // 2. Validate required fields
  if (
    !fullName?.trim() ||
    !phone?.trim() ||
    !province?.trim() ||
    !district?.trim() ||
    !city?.trim() ||
    !street?.trim()
  ) {
    throw new ApiError(400, "All required fields must be provided.");
  }

  // 3. Validate phone number
  if (!/^[0-9]{10}$/.test(phone.trim())) {
    throw new ApiError(400, "Phone number must be 10 digits.");
  }

  // 4 & 5. Handle default address
  if (isDefault) {
    await Address.updateMany(
      { userId: req.user._id },
      { $set: { isDefault: false } }
    );
  }

  // If this is the user's first address,
  // automatically make it the default.
  const addressCount = await Address.countDocuments({
    userId: req.user._id,
  });

  const address = await Address.create({
    userId: req.user._id,
    fullName: fullName.trim(),
    phone: phone.trim(),
    province: province.trim(),
    district: district.trim(),
    city: city.trim(),
    street: street.trim(),
    landmark: landmark?.trim() || null,
    postalCode: postalCode?.trim() || null,
    isDefault: addressCount === 0 ? true : isDefault,
  });

  // 7. Return response
  return res.status(201).json(
    new ApiResponse(
      201,
      address,
      "Address added successfully."
    )
  );
});

const getAddresses = asyncHandler(async (req, res) => {
  // ========= MVP =========
  // 1. Get logged-in user
  // 2. Find user's addresses
  // 3. Sort default address first
  // 4. Return response

  // 1. Get logged-in user
  const userId = req.user._id;

  // 2 & 3. Find user's addresses and sort default first
  const addresses = await Address.find({ userId }).sort({
    isDefault: -1,
    createdAt: -1,
  });

  // 4. Return response
  return res.status(200).json(
    new ApiResponse(
      200,
      addresses,
      addresses.length
        ? "Addresses fetched successfully."
        : "No addresses found."
    )
  );
});

const updateAddress = asyncHandler(async (req, res) => {
  // ========= MVP =========
  // 1. Read address ID
  // 2. Validate ObjectId
  // 3. Find address
  // 4. Verify ownership
  // 5. Validate provided fields
  // 6. Update only provided fields
  // 7. Save
  // 8. Return response

  // 1. Read address ID
  const { addressId } = req.params;

  // 2. Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(addressId)) {
    throw new ApiError(400, "Invalid address ID.");
  }

  // 3. Find address
  const address = await Address.findById(addressId);

  if (!address) {
    throw new ApiError(404, "Address not found.");
  }

  // 4. Verify ownership
  if (address.userId.toString() !== req.user._id.toString()) {
    throw new ApiError(
      403,
      "You are not authorized to update this address."
    );
  }

  const {
    fullName,
    phone,
    province,
    district,
    city,
    street,
    landmark,
    postalCode,
  } = req.body;

  // 5. Validate provided fields

  if (fullName !== undefined) {
    if (!fullName.trim()) {
      throw new ApiError(400, "Full name cannot be empty.");
    }
    address.fullName = fullName.trim();
  }

  if (phone !== undefined) {
    if (!/^[0-9]{10}$/.test(phone.trim())) {
      throw new ApiError(400, "Phone number must be 10 digits.");
    }
    address.phone = phone.trim();
  }

  if (province !== undefined) {
    if (!province.trim()) {
      throw new ApiError(400, "Province cannot be empty.");
    }
    address.province = province.trim();
  }

  if (district !== undefined) {
    if (!district.trim()) {
      throw new ApiError(400, "District cannot be empty.");
    }
    address.district = district.trim();
  }

  if (city !== undefined) {
    if (!city.trim()) {
      throw new ApiError(400, "City cannot be empty.");
    }
    address.city = city.trim();
  }

  if (street !== undefined) {
    if (!street.trim()) {
      throw new ApiError(400, "Street cannot be empty.");
    }
    address.street = street.trim();
  }

  if (landmark !== undefined) {
    address.landmark = landmark.trim() || null;
  }

  if (postalCode !== undefined) {
    address.postalCode = postalCode.trim() || null;
  }

  // 7. Save
  await address.save();

  // 8. Return response
  return res.status(200).json(
    new ApiResponse(
      200,
      address,
      "Address updated successfully."
    )
  );
});

const setDefaultAddress = asyncHandler(async (req, res) => {
  // ========= MVP =========
  // 1. Read address ID
  // 2. Validate ObjectId
  // 3. Find address
  // 4. Verify ownership
  // 5. Remove default from all user's addresses
  // 6. Set selected address as default
  // 7. Save
  // 8. Return response

  // 1. Read address ID
  const { addressId } = req.params;

  // 2. Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(addressId)) {
    throw new ApiError(400, "Invalid address ID.");
  }

  // 3. Find address
  const address = await Address.findById(addressId);

  if (!address) {
    throw new ApiError(404, "Address not found.");
  }

  // 4. Verify ownership
  if (address.userId.toString() !== req.user._id.toString()) {
    throw new ApiError(
      403,
      "You are not authorized to update this address."
    );
  }

  // 5. Remove default from all user's addresses
  await Address.updateMany(
    { userId: req.user._id },
    { $set: { isDefault: false } }
  );

  // 6. Set selected address as default
  address.isDefault = true;

  // 7. Save
  await address.save();

  // 8. Return response
  return res.status(200).json(
    new ApiResponse(
      200,
      address,
      "Default address updated successfully."
    )
  );
});

const deleteAddress = asyncHandler(async (req, res) => {
  // 1. Read address ID
  const { addressId } = req.params;

  // 2. Validate address ID
  if (!mongoose.Types.ObjectId.isValid(addressId)) {
    throw new ApiError(400, "Invalid address ID.");
  }

  // 3. Find address
  const address = await Address.findById(addressId);

  if (!address) {
    throw new ApiError(404, "Address not found.");
  }

  // 4. Ownership check
  if (address.userId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to delete this address.");
  }

  // 5. Prevent deleting the only address
  const addressCount = await Address.countDocuments({
    userId: req.user._id,
  });

  if (addressCount === 1) {
    throw new ApiError(
      400,
      "You cannot delete your only address."
    );
  }

  // 6. Delete address
  await Address.findByIdAndDelete(addressId);

  // 7. If deleted address was default, make another address default
  if (address.isDefault) {
    const anotherAddress = await Address.findOne({
      userId: req.user._id,
    });

    if (anotherAddress) {
      anotherAddress.isDefault = true;
      await anotherAddress.save();
    }
  }

  // 8. Return response
  return res.status(200).json(
    new ApiResponse(
      200,
      null,
      "Address deleted successfully."
    )
  );
});


export {getAddresses, setDefaultAddress, updateAddress,addAddress,deleteAddress}