import { z } from 'zod';
import User from '../models/userModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwtHelper.js';

// Validation schemas
const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string(),
});

const createSendToken = async (user, statusCode, res, deviceInfo = 'Unknown') => {
  const accessToken = signAccessToken(user._id);
  const refreshToken = signRefreshToken(user._id);

  // Store refresh token in user document
  user.activeSessions.push({ refreshToken, deviceInfo });
  await user.save({ validateBeforeSave: false });

  const cookieOptions = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', refreshToken, cookieOptions);

  user.password = undefined;
  user.activeSessions = undefined;

  res.status(statusCode).json({
    status: 'success',
    token: accessToken,
    data: {
      user,
    },
  });
};

export const register = catchAsync(async (req, res, next) => {
  const validatedData = registerSchema.parse(req.body);

  const newUser = await User.create({
    name: validatedData.name,
    email: validatedData.email,
    password: validatedData.password,
  });

  const deviceInfo = req.headers['user-agent'] || 'Unknown';
  await createSendToken(newUser, 201, res, deviceInfo);
});

export const login = catchAsync(async (req, res, next) => {
  const validatedData = loginSchema.parse(req.body);
  const { email, password } = validatedData;

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const deviceInfo = req.headers['user-agent'] || 'Unknown';
  await createSendToken(user, 200, res, deviceInfo);
});

export const logout = catchAsync(async (req, res, next) => {
  const refreshToken = req.cookies.jwt;
  
  if (refreshToken && req.user) {
    // Remove the current session
    req.user.activeSessions = req.user.activeSessions.filter(
      (session) => session.refreshToken !== refreshToken
    );
    await req.user.save({ validateBeforeSave: false });
  }

  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ status: 'success' });
});

export const refresh = catchAsync(async (req, res, next) => {
  const refreshToken = req.cookies.jwt;
  if (!refreshToken) return next(new AppError('Not logged in. Please login to get access.', 401));

  let decoded;
  try {
    decoded = verifyRefreshToken(refreshToken);
  } catch (err) {
    return next(new AppError('Invalid refresh token. Please login again.', 401));
  }

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) return next(new AppError('The user belonging to this token no longer exists.', 401));

  // Check if session exists
  const sessionExists = currentUser.activeSessions.some(
    (session) => session.refreshToken === refreshToken
  );

  if (!sessionExists) {
    // Attempted reuse of revoked token, security measure: revoke all
    currentUser.activeSessions = [];
    await currentUser.save({ validateBeforeSave: false });
    return next(new AppError('Session expired or invalidated. Please login again.', 401));
  }

  // Issue new access token
  const accessToken = signAccessToken(currentUser._id);

  res.status(200).json({
    status: 'success',
    token: accessToken,
  });
});
