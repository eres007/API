const axios = require('axios');

// Base URL for AI API provider
const API_PROVIDER_BASE_URL = 'https://pollinations.ai/api';

/**
 * Service for interacting with AI provider API
 */
exports.aiProviderService = {
  /**
   * Generate text using AI text generation models
   * @param {string} prompt - The text prompt for generation
   * @param {string} model - The model to use (e.g., mixtral-8x7b)
   * @param {number} max_tokens - Maximum number of tokens to generate
   * @returns {Promise<Object>} - API response with generated text
   */
  generateText: async (prompt, model, max_tokens) => {
    try {
      const response = await axios.post(`${API_PROVIDER_BASE_URL}/text/generate`, {
        prompt,
        model,
        max_tokens
      });
      
      return {
        text: response.data.text,
        model: model,
        tokens: response.data.usage ? response.data.usage : { prompt: null, completion: null, total: null }
      };
    } catch (error) {
      console.error('AI text generation error:', error.message);
      throw error;
    }
  },
  
  /**
   * Generate image using AI image generation models
   * @param {string} prompt - Description of the image to generate
   * @param {number} n - Number of images to generate
   * @param {string} size - Size of the output image (e.g., 1024x1024)
   * @param {string} style - Style of image to generate (e.g., photorealistic, digital-art)
   * @returns {Promise<Object>} - API response with image URLs
   */
  generateImage: async (prompt, n, size, style) => {
    try {
      const response = await axios.post(`${API_PROVIDER_BASE_URL}/image/generate`, {
        prompt,
        n,
        size,
        style
      });
      
      return {
        images: response.data.images,
        model: response.data.model || 'stable-diffusion'
      };
    } catch (error) {
      console.error('AI image generation error:', error.message);
      throw error;
    }
  },
  
  /**
   * Generate speech using AI text-to-speech models
   * @param {string} text - The text to convert to speech
   * @param {string} voice - The voice to use
   * @param {string} format - Output format (mp3, wav, etc.)
   * @returns {Promise<Object>} - API response with audio URL
   */
  generateSpeech: async (text, voice, format) => {
    try {
      const response = await axios.post(`${API_PROVIDER_BASE_URL}/speech/generate`, {
        text,
        voice,
        format
      });
      
      return {
        audio_url: response.data.audio_url,
        duration: response.data.duration || null,
        voice: voice,
        format: format
      };
    } catch (error) {
      console.error('AI speech generation error:', error.message);
      throw error;
    }
  }
};
