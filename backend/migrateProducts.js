const mongoose = require('mongoose');
const Product = require('./models/Product');

async function migrateProducts() {
  try {
    await mongoose.connect('mongodb://localhost:27017/heritagebynn', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await Product.updateMany(
      { careInstructions: { $exists: false } },
      { $set: { careInstructions: null } }
    );
    await Product.updateMany(
      { images: { $exists: false } },
      { $set: { images: [] } }
    );
    await Product.updateMany(
      { imageUrl: { $exists: false } },
      { $set: { imageUrl: null } }
    );
    await Product.updateMany(
      { sizes: { $exists: false } },
      { $set: { sizes: [] } }
    );
    await Product.updateMany(
      { colors: { $exists: false } },
      { $set: { colors: [] } }
    );
    console.log('Migration complete: Set missing fields to defaults');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrateProducts();