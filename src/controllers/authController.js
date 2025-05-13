const User = require('../models/User');

// @desc    Register a new user and get API key
// @route   POST /auth/register
// @access  Public
exports.register = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide name and email' 
      });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    
    if (user) {
      return res.status(400).json({ 
        success: false, 
        message: 'User with this email already exists' 
      });
    }

    // Create new user
    user = await User.create({
      name,
      email
    });

    res.status(201).json({
      success: true,
      apiKey: user.apiKey,
      message: 'User registered successfully. Keep your API key safe!',
      data: {
        name: user.name,
        email: user.email,
        tier: user.tier,
        limits: user.limits
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Generate a new API key for existing user
// @route   POST /auth/api-key
// @access  Private
exports.generateApiKey = async (req, res, next) => {
  try {
    const user = req.user;
    
    // Generate new API key
    const newApiKey = user.generateNewApiKey();
    await user.save();

    res.status(200).json({
      success: true,
      apiKey: newApiKey,
      message: 'New API key generated successfully. Previous API key is now invalid.'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user profile and usage statistics
// @route   GET /auth/profile
// @access  Private
exports.getUserProfile = async (req, res, next) => {
  try {
    const user = req.user;
    
    // Calculate remaining quota
    const dailyRemaining = user.limits.daily - (
      user.usage.text.count + 
      user.usage.image.count + 
      user.usage.speech.count
    );

    res.status(200).json({
      success: true,
      data: {
        name: user.name,
        email: user.email,
        tier: user.tier,
        usage: user.usage,
        limits: user.limits,
        remaining: {
          daily: dailyRemaining > 0 ? dailyRemaining : 0
        },
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};
