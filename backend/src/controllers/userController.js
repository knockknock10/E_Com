import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import { z } from 'zod';
import User from '../models/userModel.js';

const addressSchema = z.object({
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(1, 'ZipCode is required'),
  country: z.string().min(1, 'Country is required'),
  isDefault: z.boolean().optional(),
});

export const getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

export const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

export const updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password) {
    return next(new AppError('This route is not for password updates. Please use /updateMyPassword.', 400));
  }

  // Filter out unwanted fields like role
  const { name, email } = req.body;
  const filteredBody = {};
  if (name) filteredBody.name = name;
  if (email) filteredBody.email = email;

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

export const addAddress = catchAsync(async (req, res, next) => {
  const validatedAddress = addressSchema.parse(req.body);
  const user = req.user;

  if (validatedAddress.isDefault) {
    user.addresses.forEach((addr) => (addr.isDefault = false));
  } else if (user.addresses.length === 0) {
    validatedAddress.isDefault = true;
  }

  user.addresses.push(validatedAddress);
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    data: {
      addresses: user.addresses,
    },
  });
});

export const deleteAddress = catchAsync(async (req, res, next) => {
  const user = req.user;
  const addressId = req.params.addressId;

  user.addresses = user.addresses.filter((addr) => addr._id.toString() !== addressId);
  await user.save({ validateBeforeSave: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find().select('-password -activeSessions');

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});
