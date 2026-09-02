const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  connectedPlatforms: {
    twitch: {
      connected: Boolean,
      username: String,
      accessToken: String,
      refreshToken: String,
      expiresAt: Date
    },
    youtube: {
      connected: Boolean,
      username: String,
      accessToken: String,
      refreshToken: String,
      expiresAt: Date
    },
    tiktok: {
      connected: Boolean,
      username: String,
      accessToken: String,
      refreshToken: String,
      expiresAt: Date
    }
  },
  profileImage: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
