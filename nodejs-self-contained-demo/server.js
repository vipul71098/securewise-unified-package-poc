const app = require('./src/app');
const path = require('path');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// Handle graceful shutdown
const shutdown = (signal) => {
  console.log(`\n${signal} received. Shutting down gracefully...`);
  server.close(() => {
    console.log('Server closed. Exiting process.');
    process.exit(0);
  });
  
  // Force shutdown after 10 seconds
  setTimeout(() => {
    console.error('Forced shutdown after timeout');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

// Start server
const server = app.listen(PORT, HOST, () => {
  console.log('='.repeat(50));
  console.log('Self-Contained Node.js Application');
  console.log('='.repeat(50));
  console.log(`Server running on: http://${HOST}:${PORT}`);
  console.log(`Platform: ${process.platform}`);
  console.log(`Architecture: ${process.arch}`);
  console.log(`Node.js: ${process.version}`);
  console.log(`Process ID: ${process.pid}`);
  console.log(`Working Directory: ${process.cwd()}`);
  console.log(`Executable: ${process.execPath}`);
  console.log('='.repeat(50));
  console.log('\nPress Ctrl+C to stop the server\n');
});

// Handle uncaught errors
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});