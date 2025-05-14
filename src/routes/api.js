const express = require('express');
const router = express.Router();
const { generateText, generateImage, generateSpeech } = require('../controllers/apiController');
const { authenticateApiKey } = require('../middleware/auth');
const { rateLimiter } = require('../middleware/rateLimiter');

// Health check endpoint (no authentication required)
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'API is operational',
    timestamp: new Date().toISOString()
  });
});

// All other routes require API key authentication
router.use(authenticateApiKey);

// Apply rate limiter to all API endpoints
router.use(rateLimiter);

// Text generation endpoint
router.post('/text/generate', generateText);

// Image generation endpoint
router.post('/image/generate', generateImage);

// Speech generation endpoint
router.post('/speech/generate', generateSpeech);

module.exports = router;
