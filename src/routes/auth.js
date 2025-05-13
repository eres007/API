const express = require('express');
const router = express.Router();
const { register, generateApiKey, getUserProfile } = require('../controllers/authController');
const { authenticateApiKey } = require('../middleware/auth');

// Register a new user and get API key
router.post('/register', register);

// Generate a new API key for existing user
router.post('/api-key', authenticateApiKey, generateApiKey);

// Get user profile and usage statistics
router.get('/profile', authenticateApiKey, getUserProfile);

module.exports = router;
