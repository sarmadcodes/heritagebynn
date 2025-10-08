const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error('Get products error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error('Get product by ID error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Request files:', req.files);
    const { name, price, stock, category, description, fabric, sizes, colors, occasion, careInstructions, isNew, isFeatured } = req.body;
    const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];
    const imageUrl = req.files && req.files.length > 0 ? `/uploads/${req.files[0].filename}` : '';

    const product = new Product({
      name,
      price,
      stock,
      category,
      description,
      fabric,
      sizes: sizes ? sizes.split(',').map(s => s.trim()).filter(s => s) : [],
      colors: colors ? colors.split(',').map(c => c.trim()).filter(c => c) : [],
      occasion,
      careInstructions: careInstructions || 'No care instructions provided', // Set default value
      images,
      imageUrl,
      isNew: isNew === 'true',
      isFeatured: isFeatured === 'true'
    });
    await product.save();
    console.log('Product created:', product._id);
    res.status(201).json(product);
  } catch (err) {
    console.error('Create product error:', err);
    if (err.message.includes('Only JPEG and PNG images are allowed')) {
      return res.status(400).json({ message: err.message });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error', errors: err.errors });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.files && req.files.length > 0) {
      updates.imageUrl = `/uploads/${req.files[0].filename}`;
    }
    // Ensure careInstructions is not empty during updates
    if (updates.careInstructions === '' || updates.careInstructions === null || updates.careInstructions === undefined) {
      updates.careInstructions = 'No care instructions provided';
    }
    const product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    console.log('Product updated:', product._id);
    res.json(product);
  } catch (err) {
    console.error('Update product error:', err);
    if (err.message.includes('Only JPEG and PNG images are allowed')) {
      return res.status(400).json({ message: err.message });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error', errors: err.errors });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    console.log('Product deleted:', product._id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error('Delete product error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};