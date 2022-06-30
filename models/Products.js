import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: 'string', required: true },
    slug: { type: 'string', required: true, unique: true },
    category: { type: 'string', required: true },
    image: { type: 'string', required: true },
    price: { type: Number, required: true },
    brand: { type: 'string', required: true },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    description: { type: 'string', required: true },
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
