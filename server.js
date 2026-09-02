const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');
const session = require('express-session');
const passport = require('passport');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Store io instance globally
global.io = io;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));

// Session Configuration
app.use(session({
  secret: process.env.JWT_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: process.env.NODE_ENV === 'production', 
    sameSite: 'lax',
    httpOnly: true
  }
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nexostreaминghub', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ Connected to MongoDB');
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/streams', require('./routes/streams'));
app.use('/api/users', require('./routes/users'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'NexoStreamingHub is running!',
    timestamp: new Date(),
    uptime: process.uptime(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Socket.IO Events
io.on('connection', (socket) => {
  console.log('📱 New client connected:', socket.id);

  socket.on('start_stream', (data) => {
    console.log('📡 Stream started:', data);
    io.emit('stream_active', data);
  });

  socket.on('stop_stream', (data) => {
    console.log('⏹️ Stream stopped:', data);
    io.emit('stream_inactive', data);
  });

  socket.on('chat_message', (data) => {
    console.log('💬 Chat message:', data);
    io.emit('new_message', data);
  });

  socket.on('disconnect', () => {
    console.log('🔌 Client disconnected:', socket.id);
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  res.status(err.status || 500).json({ 
    error: 'Something went wrong!', 
    message: err.message,
    status: err.status || 500
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 NexoStreamingHub is running on http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🗄️ MongoDB: ${process.env.MONGODB_URI || 'mongodb://localhost:27017/nexostreaминghub'}`);
  console.log(`🎯 CORS Origin: ${process.env.CORS_ORIGIN || 'http://localhost:3000'}`);
});

module.exports = { app, io, server };
