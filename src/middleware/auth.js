const User = require('../models/User');

/**
 * Middleware to authenticate API key from request
 * Looks for API key in Authorization header or query parameter
 */
exports.authenticateApiKey = async (req, res, next) => {
  let apiKey;
  
  // Check header for token
  const authHeader = req.headers.authorization;
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    apiKey = authHeader.split(' ')[1];
  } 
  // Check if token is in query params
  else if (req.query.api_key) {
    apiKey = req.query.api_key;
  }
  
  // Check if API key exists
  if (!apiKey) {
    return res.status(401).json({
      success: false,
      message: 'API key is required for authentication'
    });
  }
  
  try {
    // Find user with the API key
    const user = await User.findOne({ apiKey });
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid API key'
      });
    }
    
    // Check if user has reached their rate limit
    if (user.hasReachedLimit()) {
      return res.status(429).json({
        success: false,
        message: 'API rate limit exceeded. Try again tomorrow or upgrade your plan.'
      });
    }
    
    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during authentication'
    });
  }
};
