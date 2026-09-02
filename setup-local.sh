#!/bin/bash

# NexoStreamingHub Local AWS Setup Script
# This script sets up the complete local development environment

set -e

echo "🚀 Starting NexoStreamingHub Local AWS Setup..."
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    echo "Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    echo "Visit: https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"
echo ""

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "✅ .env file created. Please update it with your API credentials."
else
    echo "✅ .env file already exists"
fi

echo ""
echo "📦 Installing dependencies..."
npm install

echo ""
echo "🐳 Building Docker images..."
docker-compose build

echo ""
echo "🚀 Starting services with Docker Compose..."
docker-compose up -d

echo ""
echo "⏳ Waiting for services to be ready..."
sleep 10

echo ""
echo "✅ NexoStreamingHub is now running!"
echo ""
echo "📍 Access your application at:"
echo "   Backend: http://localhost:5000"
echo "   MongoDB: mongodb://admin:password123@localhost:27017/nexostreaминghub"
echo "   Redis: http://localhost:6379"
echo ""
echo "📊 Useful commands:"
echo "   View logs:        docker-compose logs -f backend"
echo "   Stop services:    docker-compose down"
echo "   Restart services: docker-compose restart"
echo "   Remove all data:  docker-compose down -v"
echo ""
echo "🎉 Setup complete! Your app is ready to use."
