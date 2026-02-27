const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Basic logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// Routes
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Self-Contained Node.js App</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: 50px auto;
          padding: 20px;
          background: #f5f5f5;
        }
        .container {
          background: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1 { color: #333; }
        .info { background: #e3f2fd; padding: 15px; border-radius: 4px; margin: 20px 0; }
        .endpoint { background: #f5f5f5; padding: 10px; margin: 10px 0; border-left: 4px solid #2196F3; }
        code { background: #263238; color: #aed581; padding: 2px 6px; border-radius: 3px; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🚀 Self-Contained Node.js Application</h1>
        <div class="info">
          <p><strong>Status:</strong> Running</p>
          <p><strong>Platform:</strong> ${process.platform}</p>
          <p><strong>Architecture:</strong> ${process.arch}</p>
          <p><strong>Node Version:</strong> ${process.version}</p>
          <p><strong>Process ID:</strong> ${process.pid}</p>
        </div>
        
        <h2>Available Endpoints</h2>
        <div class="endpoint">
          <strong>GET</strong> <code>/</code> - This page
        </div>
        <div class="endpoint">
          <strong>GET</strong> <code>/health</code> - Health check endpoint
        </div>
        <div class="endpoint">
          <strong>GET</strong> <code>/api/info</code> - System information (JSON)
        </div>
        <div class="endpoint">
          <strong>GET</strong> <code>/api/config</code> - Application configuration
        </div>
        <div class="endpoint">
          <strong>POST</strong> <code>/api/echo</code> - Echo back your JSON payload
        </div>
        <div class="endpoint">
          <strong>GET</strong> <code>/api/files</code> - List bundled files
        </div>
      </div>
    </body>
    </html>
  `);
});

// Health check endpoint
app.get('/health', (req, res) => {
  const uptime = process.uptime();
  const memoryUsage = process.memoryUsage();
  
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: {
      seconds: Math.floor(uptime),
      formatted: `${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m ${Math.floor(uptime % 60)}s`
    },
    memory: {
      rss: `${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`,
      heapUsed: `${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`,
      heapTotal: `${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`
    }
  });
});

// System info endpoint
app.get('/api/info', (req, res) => {
  res.json({
    application: {
      name: 'Self-Contained Node.js App',
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'production'
    },
    system: {
      platform: process.platform,
      arch: process.arch,
      nodeVersion: process.version,
      hostname: require('os').hostname(),
      cpus: require('os').cpus().length,
      totalMemory: `${(require('os').totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`,
      freeMemory: `${(require('os').freemem() / 1024 / 1024 / 1024).toFixed(2)} GB`
    },
    process: {
      pid: process.pid,
      uptime: process.uptime(),
      cwd: process.cwd(),
      execPath: process.execPath,
      argv: process.argv
    }
  });
});

// Configuration endpoint
app.get('/api/config', (req, res) => {
  const configPath = path.join(__dirname, '../config/app-config.json');
  
  if (fs.existsSync(configPath)) {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    res.json({
      success: true,
      config: config
    });
  } else {
    res.status(404).json({
      success: false,
      error: 'Configuration file not found',
      defaultConfig: {
        appName: 'Self-Contained Demo',
        features: {
          logging: true,
          analytics: false
        }
      }
    });
  }
});

// Echo endpoint
app.post('/api/echo', (req, res) => {
  res.json({
    received: req.body,
    timestamp: new Date().toISOString(),
    headers: req.headers
  });
});

// List bundled files
app.get('/api/files', (req, res) => {
  const publicDir = path.join(__dirname, '../public');
  const configDir = path.join(__dirname, '../config');
  
  const getFiles = (dir) => {
    try {
      if (!fs.existsSync(dir)) return [];
      return fs.readdirSync(dir).map(file => ({
        name: file,
        path: path.join(dir, file),
        isDirectory: fs.statSync(path.join(dir, file)).isDirectory()
      }));
    } catch (err) {
      return [];
    }
  };
  
  res.json({
    public: getFiles(publicDir),
    config: getFiles(configDir)
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.path,
    method: req.method
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

module.exports = app;