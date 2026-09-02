# 📚 AWS Local Setup Guide for NexoStreamingHub

## Quick Start (Automated Setup)

### For macOS/Linux:
```bash
chmod +x setup-local.sh
./setup-local.sh
```

### For Windows:
```cmd
setup-local.bat
```

This will:
1. ✅ Check Docker and Docker Compose installation
2. ✅ Create `.env` configuration file
3. ✅ Install npm dependencies
4. ✅ Build Docker images
5. ✅ Start all services (MongoDB, Redis, Backend)

---

## Manual Setup (Step by Step)

### Prerequisites
- **Docker Desktop** - [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose** - [Install Docker Compose](https://docs.docker.com/compose/install/)
- **Node.js 18+** - [Install Node.js](https://nodejs.org/)
- **Git** - [Install Git](https://git-scm.com/)

### Step 1: Clone the Repository
```bash
git clone https://github.com/brianmcleroy11-ops/NexoStreamingHub.git
cd NexoStreamingHub
```

### Step 2: Setup Environment Variables
```bash
cp .env.example .env
```

Edit `.env` and add your API credentials:
```env
# Twitch API
TWITCH_CLIENT_ID=your_twitch_client_id
TWITCH_CLIENT_SECRET=your_twitch_client_secret

# YouTube API
YOUTUBE_CLIENT_ID=your_youtube_client_id
YOUTUBE_CLIENT_SECRET=your_youtube_client_secret

# TikTok API
TIKTOK_CLIENT_ID=your_tiktok_client_id
TIKTOK_CLIENT_SECRET=your_tiktok_client_secret

# JWT Secret (generate a random string)
JWT_SECRET=your_super_secret_jwt_key_123456789
```

### Step 3: Install Dependencies
```bash
npm install
```

### Step 4: Start Docker Services
```bash
docker-compose up -d
```

This starts:
- **MongoDB** on port 27017
- **Redis** on port 6379
- **Backend Server** on port 5000

### Step 5: Verify Services are Running
```bash
docker-compose ps
```

You should see:
```
CONTAINER ID   IMAGE     STATUS
...mongodb...  Up (healthy)
...redis...    Up (healthy)
...backend...  Up (healthy)
```

---

## 📍 Access Points

| Service | URL | Credentials |
|---------|-----|----------|
| **Backend API** | http://localhost:5000 | N/A |
| **Health Check** | http://localhost:5000/api/health | N/A |
| **MongoDB** | mongodb://localhost:27017 | admin / password123 |
| **Redis** | http://localhost:6379 | N/A |

---

## 📊 Useful Docker Commands

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f mongodb
docker-compose logs -f redis
```

### Stop Services
```bash
docker-compose stop
```

### Restart Services
```bash
docker-compose restart
```

### Remove Everything (including data)
```bash
docker-compose down -v
```

### Rebuild Containers
```bash
docker-compose build --no-cache
docker-compose up -d
```

---

## 🧪 Testing the Setup

### 1. Test Backend Health
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "NexoStreamingHub is running!"
}
```

### 2. Test MongoDB Connection
```bash
# Using Docker exec
docker-compose exec mongodb mongosh -u admin -p password123

# In mongosh shell
use nexostreaминghub
db.users.find()
```

### 3. Test Redis Connection
```bash
docker-compose exec redis redis-cli ping
```

---

## 🔧 Development Workflow

### Run in Development Mode
```bash
docker-compose up -d
npm run dev
```

### View Real-time Logs
```bash
docker-compose logs -f backend
```

### Make Code Changes
Changes to files will automatically reload thanks to nodemon.

### Stop Development
```bash
docker-compose down
```

---

## 📦 Getting API Credentials

### Twitch
1. Go to [Twitch Developer Console](https://dev.twitch.tv/console/apps)
2. Login with your Twitch account
3. Click "Create Application"
4. Fill in the form (Name, Category: Application Integration)
5. Accept terms and create
6. Click "Manage" on your app
7. Copy Client ID and generate Client Secret
8. Add OAuth Redirect URI: `http://localhost:5000/auth/twitch/callback`

### YouTube
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Go to "APIs & Services" > "Library"
4. Search and enable "YouTube Data API v3"
5. Go to "Credentials"
6. Click "Create Credentials" > "OAuth client ID"
7. Select "Web application"
8. Add authorized redirect URI: `http://localhost:5000/auth/youtube/callback`
9. Copy Client ID and Client Secret

### TikTok
1. Go to [TikTok Developer Portal](https://developers.tiktok.com/)
2. Create a developer account
3. Create a new app
4. Select "Web" as the platform
5. Fill in app details
6. Add redirect URI: `http://localhost:5000/auth/tiktok/callback`
7. Copy Client Key and Client Secret

---

## 🆘 Troubleshooting

### Docker won't start
```bash
# Ensure Docker Desktop is running
# Restart Docker Desktop
# Or restart Docker daemon:
sudo systemctl restart docker  # Linux
```

### Port already in use
```bash
# Find and kill process using port
# On macOS/Linux:
lsof -i :5000
kill -9 <PID>

# On Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### MongoDB connection failed
```bash
# Check if MongoDB container is running
docker-compose ps

# View MongoDB logs
docker-compose logs mongodb

# Rebuild MongoDB container
docker-compose down
docker-compose build mongodb
docker-compose up -d mongodb
```

### Dependency issues
```bash
# Clear npm cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Environment variables not loading
```bash
# Ensure .env file is in the root directory
ls -la .env

# Restart backend
docker-compose restart backend
```

---

## 🚀 Next Steps

1. **Add API Credentials** - Update `.env` with your API keys
2. **Test Authentication** - Visit `http://localhost:5000/api/auth/twitch`
3. **Create Frontend** - Build React frontend in `/client` directory
4. **Deploy to AWS** - When ready, follow AWS deployment guide

---

## 📞 Support

For issues:
1. Check the [GitHub Issues](https://github.com/brianmcleroy11-ops/NexoStreamingHub/issues)
2. Review Docker logs: `docker-compose logs -f`
3. Ensure all prerequisites are installed
4. Check `.env` file configuration

---

**Happy Streaming! 🎥✨**
