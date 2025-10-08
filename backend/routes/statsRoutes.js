const express = require('express');
const { getStats } = require('../controllers/statsController');
const protect = require('../middleware/auth');

const router = express.Router();
router.get('/', protect, getStats);

module.exports = router;