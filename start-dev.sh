#!/bin/bash

# UniReps Blog Development Startup Script
# This script starts both Jekyll and the Node.js server

set -e

echo "🏗️  Starting UniReps Blog Development Environment"
echo ""

# Check if Docker is available
if command -v docker &> /dev/null && command -v docker compose &> /dev/null; then
    echo "🐳 Starting Jekyll with Docker..."
    docker compose up -d
    
    echo "⏳ Waiting for Jekyll to start..."
    sleep 10
    
    echo "🟢 Jekyll should be running on http://localhost:8080"
    echo "📋 Check Jekyll logs: docker compose logs -f"
    echo ""
    
    echo "🚀 Starting Node.js development server..."
    echo "🟢 Server will be available on http://localhost:3000"
    echo "💊 Health check: http://localhost:3000/health"
    echo ""
    echo "Press Ctrl+C to stop both servers"
    
    # Start Node.js server in development mode
    npm run dev
    
else
    echo "⚠️  Docker not available. Starting in production mode..."
    echo "🏗️  Building Jekyll site..."
    
    # Check if bundle is available
    if command -v bundle &> /dev/null; then
        bundle exec jekyll build
    else
        echo "❌ Jekyll/Bundle not available. Please install Ruby and Jekyll or use Docker."
        exit 1
    fi
    
    echo "🚀 Starting Node.js production server..."
    NODE_ENV=production npm start
fi