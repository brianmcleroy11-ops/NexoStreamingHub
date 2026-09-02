const express = require('express');
const router = express.Router();

// Get user profile
router.get('/profile/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // This would query your database
    res.json({
      userId,
      username: 'user',
      email: 'user@example.com',
      connectedPlatforms: []
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get connected platforms
router.get('/:userId/platforms', async (req, res) => {
  try {
    const { userId } = req.params;
    
    res.json({
      userId,
      platforms: {
        twitch: { connected: false, username: null },
        youtube: { connected: false, username: null },
        tiktok: { connected: false, username: null }
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Disconnect platform
router.post('/:userId/disconnect/:platform', async (req, res) => {
  try {
    const { userId, platform } = req.params;
    
    res.json({
      success: true,
      message: `${platform} disconnected from your account`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
