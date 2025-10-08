const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
  imageUrl: { type: String },
  category: { type: String, required: true },
  description: { type: String, required: true },
  fabric: { type: String, required: true },
  sizes: [String],
  colors: [String],
  occasion: { type: String, required: true },
  careInstructions: { type: String, default: '' }, // Allow empty strings
  images: [String],
  isNew: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false }
}, { 
  timestamps: true,
  suppressReservedKeysWarning: true,
  collection: 'products'
});

module.exports = mongoose.model('Product', productSchema);