const express = require('express');
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const protect = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// Public GET for shop page, protected for admin
router.route('/').get(getProducts).post(protect, upload.array('images', 5), createProduct);
router.route('/:id').get(getProductById).put(protect, upload.array('images', 5), updateProduct).delete(protect, deleteProduct);

module.exports = router;