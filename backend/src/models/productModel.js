import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A product must have a name'],
      trim: true,
      maxlength: [100, 'A product name must be less or equal to 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'A product must have a description'],
    },
    price: {
      type: Number,
      required: [true, 'A product must have a price'],
      min: [0, 'Price must be above or equal to 0'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // this only points to current doc on NEW document creation
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price',
      },
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: [true, 'Product must belong to a category'],
    },
    stock: {
      type: Number,
      required: [true, 'A product must have a stock quantity'],
      min: [0, 'Stock cannot be negative'],
      default: 0,
    },
    brand: {
      type: String,
      trim: true,
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    images: [String],
    coverImage: {
      type: String,
      required: [true, 'A product must have a cover image'],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for performance
productSchema.index({ price: 1, ratingsAverage: -1 });
productSchema.index({ name: 'text', description: 'text', brand: 'text' });
productSchema.index({ category: 1 });

const Product = mongoose.model('Product', productSchema);
export default Product;
