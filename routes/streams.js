const express = require('express');
const router = express.Router();
const axios = require('axios');

// Start multistream
router.post('/start', async (req, res) => {
  try {
    const { userId, title, description, platforms } = req.body;

    // Validate required fields
    if (!userId || !title || !platforms) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const streamConfig = {
      userId,
      title,
      description,
      platforms,
      startedAt: new Date(),
      isLive: true,
      streamId: `stream_${Date.now()}`
    };

    // Broadcast to all connected clients
    global.io?.emit('stream_started', streamConfig);

    res.json({
      success: true,
      message: 'Stream started on selected platforms',
      streamConfig
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Stop multistream
router.post('/stop', async (req, res) => {
  try {
    const { streamId } = req.body;

    global.io?.emit('stream_stopped', { streamId });

    res.json({
      success: true,
      message: 'Stream stopped on all platforms'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get active streams
router.get('/active', async (req, res) => {
  try {
    // This would typically query your database
    res.json({
      streams: [],
      message: 'No active streams'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get stream status
router.get('/:streamId', async (req, res) => {
  try {
    const { streamId } = req.params;
    
    res.json({
      streamId,
      status: 'active',
      viewers: 0,
      platforms: ['twitch', 'youtube', 'tiktok']
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
