import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: [true, 'Cart item must belong to a product'],
  },
  quantity: {
    type: Number,
    required: [true, 'Cart item must have a quantity'],
    min: [1, 'Quantity cannot be less than 1'],
    default: 1,
  },
  price: {
    type: Number,
    required: [true, 'Cart item must have a price at the time of addition'],
  },
}, { _id: false });

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Cart must belong to a user'],
      unique: true,
    },
    items: [cartItemSchema],
    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

cartSchema.pre('save', function (next) {
  this.totalPrice = this.items.reduce((acc, item) => acc + item.quantity * item.price, 0);
  next();
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
