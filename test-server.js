require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Basic middleware
app.use(cors());
app.use(express.json());

// Simple test route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Fortec AI - Test Server',
    status: 'active'
  });
});

// Simple test auth route
app.post('/auth/register', (req, res) => {
  res.json({
    success: true,
    message: 'Registration successful',
    apiKey: 'test-api-key-' + Math.random().toString(36).substring(2, 15)
  });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    // Start the server anyway for testing
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} (without MongoDB)`);
    });
  });
