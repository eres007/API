const { RateLimiterMemory } = require('rate-limiter-flexible');

// Create a general rate limiter that applies to all users
// This is in addition to the user-specific limits in the database
const generalLimiter = new RateLimiterMemory({
  points: 30, // Number of requests
  duration: 60, // Per minute
});

/**
 * Middleware for rate limiting API requests
 * Uses both a general rate limiter and checks against user-specific limits
 */
exports.rateLimiter = async (req, res, next) => {
  try {
    // Apply general rate limiter based on IP to prevent abuse
    await generalLimiter.consume(req.ip);
    
    // The user-specific rate limit is already checked in the auth middleware
    // No additional check needed here since we've validated in auth middleware
    
    next();
  } catch (error) {
    if (error.remainingPoints !== undefined) {
      // This is a rate limiter error
      return res.status(429).json({
        success: false,
        message: 'Too many requests - please slow down',
        retryAfter: error.msBeforeNext / 1000 || 60
      });
    }
    
    // Pass any other errors to the main error handler
    next(error);
  }
};
