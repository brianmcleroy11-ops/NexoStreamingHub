@echo off
REM NexoStreamingHub Local AWS Setup Script (Windows)
REM This script sets up the complete local development environment

echo.
echo 🚀 Starting NexoStreamingHub Local AWS Setup...
echo.

REM Check if Docker is installed
docker --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Docker is not installed. Please install Docker Desktop first.
    echo Visit: https://docs.docker.com/desktop/install/windows-install/
    pause
    exit /b 1
)

echo ✅ Docker is installed
echo.

REM Check if Docker Compose is installed
docker-compose --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Docker Compose is not installed.
    echo It comes with Docker Desktop, please ensure it's properly installed.
    pause
    exit /b 1
)

echo ✅ Docker Compose is installed
echo.

REM Create .env file if it doesn't exist
if not exist .env (
    echo 📝 Creating .env file from .env.example...
    copy .env.example .env
    echo ✅ .env file created. Please update it with your API credentials.
) else (
    echo ✅ .env file already exists
)

echo.
echo 📦 Installing dependencies...
call npm install

echo.
echo 🐳 Building Docker images...
call docker-compose build

echo.
echo 🚀 Starting services with Docker Compose...
call docker-compose up -d

echo.
echo ⏳ Waiting for services to be ready...
timeout /t 10 /nobreak

echo.
echo ✅ NexoStreamingHub is now running!
echo.
echo 📍 Access your application at:
echo    Backend: http://localhost:5000
echo    MongoDB: mongodb://admin:password123@localhost:27017/nexostreaминghub
echo    Redis: http://localhost:6379
echo.
echo 📊 Useful commands:
echo    View logs:        docker-compose logs -f backend
echo    Stop services:    docker-compose down
echo    Restart services: docker-compose restart
echo    Remove all data:  docker-compose down -v
echo.
echo 🎉 Setup complete! Your app is ready to use.
echo.
pause
