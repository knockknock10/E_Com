import Cart from '../models/cartModel.js';
import Product from '../models/productModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

export const getCart = catchAsync(async (req, res, next) => {
  let cart = await Cart.findOne({ user: req.user.id }).populate('items.product', 'name price images coverImage');

  if (!cart) {
    cart = await Cart.create({ user: req.user.id, items: [] });
  }

  res.status(200).json({
    status: 'success',
    data: {
      cart,
    },
  });
});

export const addToCart = catchAsync(async (req, res, next) => {
  const { productId, quantity = 1 } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    return next(new AppError('No product found with that ID', 404));
  }

  let cart = await Cart.findOne({ user: req.user.id });
  if (!cart) {
    cart = await Cart.create({ user: req.user.id, items: [] });
  }

  const existingItemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (existingItemIndex > -1) {
    cart.items[existingItemIndex].quantity += quantity;
  } else {
    cart.items.push({
      product: productId,
      quantity,
      price: product.price,
    });
  }

  await cart.save();
  await cart.populate('items.product', 'name price images coverImage');

  res.status(200).json({
    status: 'success',
    data: {
      cart,
    },
  });
});

export const updateCartItem = catchAsync(async (req, res, next) => {
  const { quantity } = req.body;
  const { productId } = req.params;

  if (quantity < 1) {
    return next(new AppError('Quantity must be at least 1', 400));
  }

  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) {
    return next(new AppError('Cart not found', 404));
  }

  const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity = quantity;
    await cart.save();
    await cart.populate('items.product', 'name price images coverImage');

    res.status(200).json({
      status: 'success',
      data: {
        cart,
      },
    });
  } else {
    return next(new AppError('Product not found in cart', 404));
  }
});

export const removeFromCart = catchAsync(async (req, res, next) => {
  const { productId } = req.params;

  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) {
    return next(new AppError('Cart not found', 404));
  }

  cart.items = cart.items.filter((item) => item.product.toString() !== productId);
  await cart.save();
  await cart.populate('items.product', 'name price images coverImage');

  res.status(200).json({
    status: 'success',
    data: {
      cart,
    },
  });
});

export const clearCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user.id });
  
  if (cart) {
    cart.items = [];
    await cart.save();
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
