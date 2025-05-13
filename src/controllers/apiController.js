const axios = require('axios');
const { aiProviderService } = require('../services/aiProviderService');

// @desc    Generate text using AI models
// @route   POST /api/text/generate
// @access  Private (API Key)
exports.generateText = async (req, res, next) => {
  try {
    const { prompt, model = 'mistralai/mixtral-8x7b-instruct-v0.1', max_tokens = 500 } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ 
        success: false, 
        message: 'Prompt is required' 
      });
    }
    
    // Track usage in user model
    await req.user.trackUsage('text');
    
    // Call AI provider service
    const response = await aiProviderService.generateText(prompt, model, max_tokens);
    
    res.status(200).json({
      success: true,
      data: response
    });
  } catch (error) {
    console.error('Text generation error:', error);
    
    if (error.response) {
      return res.status(error.response.status).json({
        success: false,
        message: error.response.data.message || 'Error from upstream API provider',
        error: error.response.data
      });
    }
    
    next(error);
  }
};

// @desc    Generate image using AI models
// @route   POST /api/image/generate
// @access  Private (API Key)
exports.generateImage = async (req, res, next) => {
  try {
    const { prompt, n = 1, size = '1024x1024', style = 'photographic' } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ 
        success: false, 
        message: 'Prompt is required' 
      });
    }
    
    // Track usage in user model
    await req.user.trackUsage('image');
    
    // Call AI provider service
    const response = await aiProviderService.generateImage(prompt, n, size, style);
    
    res.status(200).json({
      success: true,
      data: response
    });
  } catch (error) {
    console.error('Image generation error:', error);
    
    if (error.response) {
      return res.status(error.response.status).json({
        success: false,
        message: error.response.data.message || 'Error from upstream API provider',
        error: error.response.data
      });
    }
    
    next(error);
  }
};

// @desc    Generate speech using AI models
// @route   POST /api/speech/generate
// @access  Private (API Key)
exports.generateSpeech = async (req, res, next) => {
  try {
    const { text, voice = 'alloy', format = 'mp3' } = req.body;
    
    if (!text) {
      return res.status(400).json({ 
        success: false, 
        message: 'Text is required' 
      });
    }
    
    // Track usage in user model
    await req.user.trackUsage('speech');
    
    // Call AI provider service
    const response = await aiProviderService.generateSpeech(text, voice, format);
    
    res.status(200).json({
      success: true,
      data: response
    });
  } catch (error) {
    console.error('Speech generation error:', error);
    
    if (error.response) {
      return res.status(error.response.status).json({
        success: false,
        message: error.response.data.message || 'Error from upstream API provider',
        error: error.response.data
      });
    }
    
    next(error);
  }
};
