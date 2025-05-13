const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      'Please provide a valid email'
    ],
    lowercase: true,
    trim: true
  },
  apiKey: {
    type: String,
    unique: true,
    default: () => uuidv4()
  },
  usage: {
    text: {
      count: { type: Number, default: 0 },
      lastUsed: { type: Date }
    },
    image: {
      count: { type: Number, default: 0 },
      lastUsed: { type: Date }
    },
    speech: {
      count: { type: Number, default: 0 },
      lastUsed: { type: Date }
    }
  },
  tier: {
    type: String,
    enum: ['free', 'basic', 'premium'],
    default: 'free'
  },
  limits: {
    daily: { type: Number, default: 100 },
    monthly: { type: Number, default: 3000 }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Method to generate new API key
UserSchema.methods.generateNewApiKey = function() {
  this.apiKey = uuidv4();
  return this.apiKey;
};

// Method to check if user has reached their rate limit
UserSchema.methods.hasReachedLimit = function() {
  // Calculate total usage for the day
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  
  const todayTotal = 
    (this.usage.text.lastUsed > todayStart ? this.usage.text.count : 0) +
    (this.usage.image.lastUsed > todayStart ? this.usage.image.count : 0) +
    (this.usage.speech.lastUsed > todayStart ? this.usage.speech.count : 0);
  
  return todayTotal >= this.limits.daily;
};

// Method to track API usage
UserSchema.methods.trackUsage = function(apiType) {
  if (!['text', 'image', 'speech'].includes(apiType)) {
    throw new Error('Invalid API type');
  }
  
  this.usage[apiType].count += 1;
  this.usage[apiType].lastUsed = new Date();
  
  return this.save();
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
