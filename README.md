# 🎥 NexoStreamingHub

A free, open-source multistreaming platform that allows you to stream simultaneously on **TikTok**, **Twitch**, and **YouTube** - all from one unified dashboard.

## ✨ Features

- 🔐 **Easy Account Connection** - Connect your Twitch, YouTube, and TikTok accounts with OAuth
- 📡 **Simultaneous Streaming** - Stream to multiple platforms at once with a single click
- 💬 **Real-time Chat** - Unified chat from all connected platforms
- 📊 **Analytics Dashboard** - Track viewers, engagement, and performance across all platforms
- 🎛️ **Stream Controls** - Easy start/stop controls for all platforms
- 🎨 **Customizable Overlays** - Create platform-specific overlays
- 🔔 **Real-time Notifications** - Get alerts from all platforms in one place
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🚀 **Free & Open Source** - No subscription required, MIT Licensed

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- FFmpeg (for stream encoding)
- API credentials for:
  - Twitch Developer Console
  - Google Cloud Platform (YouTube)
  - TikTok Developer Portal

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/brianmcleroy11-ops/NexoStreamingHub.git
cd NexoStreamingHub
```

### 2. Install dependencies

```bash
npm install
cd client && npm install && cd ..
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` and add your API credentials:

```env
TWITCH_CLIENT_ID=your_twitch_client_id
TWITCH_CLIENT_SECRET=your_twitch_client_secret
YOUTUBE_CLIENT_ID=your_youtube_client_id
YOUTUBE_CLIENT_SECRET=your_youtube_client_secret
TIKTOK_CLIENT_ID=your_tiktok_client_id
TIKTOK_CLIENT_SECRET=your_tiktok_client_secret
JWT_SECRET=your_jwt_secret_key
MONGODB_URI=mongodb://localhost:27017/nexostreaминghub
```

### 4. Start the application

```bash
# Development mode
npm run dev

# Production mode
npm start
```

The application will be available at `http://localhost:5000`

## 📚 API Documentation

### Authentication Endpoints

- `GET /api/auth/twitch` - Twitch OAuth login
- `GET /api/auth/youtube` - YouTube OAuth login
- `GET /api/auth/tiktok` - TikTok OAuth login
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user info

### Stream Endpoints

- `POST /api/streams/start` - Start multistream
- `POST /api/streams/stop` - Stop multistream
- `GET /api/streams/active` - Get active streams
- `GET /api/streams/:streamId` - Get stream status

### User Endpoints

- `GET /api/users/profile/:userId` - Get user profile
- `GET /api/users/:userId/platforms` - Get connected platforms
- `POST /api/users/:userId/disconnect/:platform` - Disconnect platform

## 🔧 Configuration

### Twitch Setup

1. Go to [Twitch Developer Console](https://dev.twitch.tv/console/apps)
2. Create a new application
3. Set the OAuth Redirect URI to `http://localhost:5000/auth/twitch/callback`
4. Copy your Client ID and Client Secret

### YouTube Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable YouTube Data API v3
4. Create OAuth 2.0 credentials (Web application)
5. Set authorized redirect URI to `http://localhost:5000/auth/youtube/callback`

### TikTok Setup

1. Go to [TikTok Developer Portal](https://developers.tiktok.com/)
2. Create a new application
3. Set the redirect URI to `http://localhost:5000/auth/tiktok/callback`
4. Copy your Client Key and Client Secret

## 🏗️ Project Structure

```
NexoStreamingHub/
├── server.js              # Main server file
├── package.json           # Dependencies
├── .env.example          # Environment variables template
├── routes/
│   ├── auth.js           # Authentication routes
│   ├── streams.js        # Stream management routes
│   └── users.js          # User management routes
├── models/               # Database models
├── middleware/           # Custom middleware
├── utils/                # Utility functions
└── client/               # Frontend React application
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Bug Reports

Found a bug? Please open an issue on GitHub with detailed information about:
- What you were doing when the bug occurred
- Expected behavior
- Actual behavior
- Screenshots (if applicable)

## 💬 Support

For support, please:
- Open an issue on GitHub
- Check existing issues and discussions
- Email: support@nexostreaминghub.com

## 🗺️ Roadmap

- [ ] Web-based streaming encoder
- [ ] Stream scheduling
- [ ] Automated clip creation
- [ ] Community features
- [ ] Premium features
- [ ] Mobile app
- [ ] Additional platform support (Facebook Live, etc.)
- [ ] AI-powered stream optimization
- [ ] Advanced analytics and insights
- [ ] Monetization features

## ⭐ Star Us!

If you find NexoStreamingHub useful, please consider giving us a star on GitHub!

---

**Made with ❤️ by the NexoStreamingHub Team**
