const mongoose = require('mongoose');

const streamSchema = new mongoose.Schema({
  streamId: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  platforms: {
    type: [String],
    enum: ['twitch', 'youtube', 'tiktok'],
    required: true
  },
  isLive: {
    type: Boolean,
    default: false
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  endedAt: Date,
  viewerCount: {
    type: Number,
    default: 0
  },
  duration: Number,
  thumbnail: String,
  recordingUrl: String,
  platformStreamIds: {
    twitch: String,
    youtube: String,
    tiktok: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Stream', streamSchema);
