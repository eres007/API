# Premium AI API Service

A robust API server that integrates with pollinations.ai to provide free AI services for text, image, and speech generation. This server manages user-specific API keys, rate limiting, and usage tracking.

## Live API

The API is deployed and available at: https://premium-ai-api-service.onrender.com

## Features

- **Text Generation API**: Generate AI text using various models
- **Image Generation API**: Create AI-generated images from text prompts
- **Speech Generation API**: Convert text to speech with different voices
- **User Management**: Register users and generate unique API keys
- **Rate Limiting**: Control API usage based on user tiers
- **Usage Tracking**: Monitor and log API usage for each user

## API Endpoints

### Authentication

#### Register a New User
```bash
curl -X POST https://premium-ai-api-service.onrender.com/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Your Name", 
    "email": "your.email@example.com"
  }'
```

Response:
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "apiKey": "your-generated-api-key",
    "user": {
      "name": "Your Name",
      "email": "your.email@example.com"
    }
  }
}
```

#### Generate a New API Key
```bash
curl -X POST https://premium-ai-api-service.onrender.com/auth/api-key \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your.email@example.com"
  }'
```

#### Get User Profile
```bash
curl -X GET https://premium-ai-api-service.onrender.com/auth/profile \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### AI Services

#### Generate Text
```bash
curl -X POST https://premium-ai-api-service.onrender.com/api/text/generate \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Write a short story about a robot learning to feel emotions.",
    "max_tokens": 250,
    "temperature": 0.7
  }'
```

#### Generate Image
```bash
curl -X POST https://premium-ai-api-service.onrender.com/api/image/generate \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "a futuristic city at night with neon lights",
    "n": 1,
    "size": "1024x1024",
    "style": "photorealistic"
  }'
```

#### Generate Speech
```bash
curl -X POST https://premium-ai-api-service.onrender.com/api/speech/generate \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Welcome to Premium AI API Services, where powerful AI capabilities are free for everyone.",
    "voice": "alloy",
    "format": "mp3",
    "speed": 1.0
  }'
```

## Setup & Deployment

### Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with required environment variables
4. Run development server: `npm run dev`

### Deployment on Render

1. Connect your repository to Render
2. Configure environment variables in Render dashboard
3. Deploy using the provided `render.yaml` configuration

## Environment Variables

- `PORT` - Server port (default: 3000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `API_RATE_LIMIT` - Default rate limit for API calls
- `NODE_ENV` - Environment (development/production)

## Code Examples

### JavaScript (Node.js)

```javascript
// Using the Premium AI API Service with JavaScript/Node.js
const axios = require('axios');

const apiKey = 'YOUR_API_KEY'; // Get this from registering at the API
const apiUrl = 'https://premium-ai-api-service.onrender.com';

// Text Generation Example
async function generateText() {
  try {
    const response = await axios.post(`${apiUrl}/api/text/generate`, {
      prompt: 'Write a short story about a robot learning to feel emotions.',
      max_tokens: 250,
      temperature: 0.7,
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Generated text:', response.data.text);
    return response.data;
  } catch (error) {
    console.error('Error generating text:', error.response ? error.response.data : error.message);
  }
}

// Image Generation Example
async function generateImage() {
  try {
    const response = await axios.post(`${apiUrl}/api/image/generate`, {
      prompt: 'a futuristic city at night with neon lights',
      n: 1,
      size: '1024x1024',
      style: 'photorealistic',
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Image URL:', response.data.images[0]);
    return response.data;
  } catch (error) {
    console.error('Error generating image:', error.response ? error.response.data : error.message);
  }
}

// Speech Generation Example
async function generateSpeech() {
  try {
    const response = await axios.post(`${apiUrl}/api/speech/generate`, {
      text: 'Welcome to Premium AI API Services, where powerful AI capabilities are free for everyone.',
      voice: 'alloy',
      format: 'mp3',
      speed: 1.0,
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Audio URL:', response.data.audio_url);
    return response.data;
  } catch (error) {
    console.error('Error generating speech:', error.response ? error.response.data : error.message);
  }
}
```

### Python

```python
# Using the Premium AI API Service with Python
import requests

api_key = "YOUR_API_KEY"  # Get this from registering at the API
api_url = "https://premium-ai-api-service.onrender.com"

# Text Generation Example
def generate_text():
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    data = {
        "prompt": "Write a short story about a robot learning to feel emotions.",
        "max_tokens": 250,
        "temperature": 0.7
    }
    
    try:
        response = requests.post(f"{api_url}/api/text/generate", headers=headers, json=data)
        response.raise_for_status()  # Raise exception for 4XX/5XX responses
        result = response.json()
        
        print(f"Generated text: {result['text']}")
        return result
    except requests.exceptions.RequestException as e:
        print(f"Error generating text: {e}")
        return None

# Image Generation Example
def generate_image():
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    data = {
        "prompt": "a futuristic city at night with neon lights",
        "n": 1,
        "size": "1024x1024",
        "style": "photorealistic"
    }
    
    try:
        response = requests.post(f"{api_url}/api/image/generate", headers=headers, json=data)
        response.raise_for_status()
        result = response.json()
        
        print(f"Image URL: {result['images'][0]}")
        return result
    except requests.exceptions.RequestException as e:
        print(f"Error generating image: {e}")
        return None

# Speech Generation Example
def generate_speech():
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    data = {
        "text": "Welcome to Premium AI API Services, where powerful AI capabilities are free for everyone.",
        "voice": "alloy",
        "format": "mp3",
        "speed": 1.0
    }
    
    try:
        response = requests.post(f"{api_url}/api/speech/generate", headers=headers, json=data)
        response.raise_for_status()
        result = response.json()
        
        print(f"Audio URL: {result['audio_url']}")
        return result
    except requests.exceptions.RequestException as e:
        print(f"Error generating speech: {e}")
        return None
```

## License

ISC

---

*Powered by pollinations.ai - Free AI models for everyone*
