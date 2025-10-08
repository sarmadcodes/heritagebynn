const express = require('express');
const { createContact, getContacts } = require('../controllers/contactController');
const protect = require('../middleware/auth');

const router = express.Router();
router.route('/').post(createContact).get(protect, getContacts);

module.exports = router;