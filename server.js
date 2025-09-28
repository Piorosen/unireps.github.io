#!/usr/bin/env node

/**
 * UniReps Blog Server
 * A Node.js server to serve the Jekyll-generated static files with enhanced functionality
 */

const express = require('express');
const path = require('path');
const fs = require('fs');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;
const JEKYLL_PORT = process.env.JEKYLL_PORT || 8080;
const STATIC_DIR = path.join(__dirname, '_site');
const NODE_ENV = process.env.NODE_ENV || 'development';

// Health check endpoint
app.get('/health', (req, res) => {
  const healthStatus = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
    staticDir: fs.existsSync(STATIC_DIR) ? 'exists' : 'missing',
    jekyllPort: JEKYLL_PORT
  };
  
  res.json(healthStatus);
});

// API endpoint for server info
app.get('/api/info', (req, res) => {
  res.json({
    name: 'UniReps Blog Server',
    version: '1.0.0',
    environment: NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// In development, proxy to Jekyll server for live reload
if (NODE_ENV === 'development') {
  console.log(`Setting up proxy to Jekyll server on port ${JEKYLL_PORT}`);
  
  app.use('/', createProxyMiddleware({
    target: `http://localhost:${JEKYLL_PORT}`,
    changeOrigin: true,
    ws: true, // Enable WebSocket proxying for live reload
    onError: (err, req, res) => {
      console.error('Proxy error:', err.message);
      res.status(502).send('Jekyll server not available');
    }
  }));
} else {
  // In production, serve static files
  if (fs.existsSync(STATIC_DIR)) {
    app.use(express.static(STATIC_DIR));
    
    // Handle client-side routing (SPA fallback)
    app.get('*', (req, res) => {
      const indexPath = path.join(STATIC_DIR, 'index.html');
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send('Page not found');
      }
    });
  } else {
    app.use((req, res) => {
      res.status(503).send('Static files not built. Please run Jekyll build first.');
    });
  }
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 UniReps Blog Server running on port ${PORT}`);
  console.log(`📝 Environment: ${NODE_ENV}`);
  console.log(`📁 Static directory: ${STATIC_DIR}`);
  console.log(`🔗 Access: http://localhost:${PORT}`);
  console.log(`💊 Health check: http://localhost:${PORT}/health`);
});

module.exports = app;