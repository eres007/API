# Premium AI API Service

A robust API server that integrates with pollinations.ai to provide free AI services for text, image, and speech generation. This server manages user-specific API keys, rate limiting, and usage tracking.

## Features

- **Text Generation API**: Generate AI text using various models
- **Image Generation API**: Create AI-generated images from text prompts
- **Speech Generation API**: Convert text to speech with different voices
- **User Management**: Register users and generate unique API keys
- **Rate Limiting**: Control API usage based on user tiers
- **Usage Tracking**: Monitor and log API usage for each user

## API Endpoints

### Authentication

- `POST /auth/register` - Register a new user and get API key
- `POST /auth/api-key` - Generate a new API key for existing user
- `GET /auth/profile` - Get user profile and usage statistics

### AI Services

- `POST /api/text/generate` - Generate text from prompt
- `POST /api/image/generate` - Generate image from prompt
- `POST /api/speech/generate` - Generate speech from text

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

## License

ISC

---

*Powered by pollinations.ai - Free AI models for everyone*
