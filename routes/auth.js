const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Twitch Authentication
router.get('/twitch', passport.authenticate('twitch', { scope: ['user:read:email', 'bits:read'] }));

router.get('/twitch/callback', passport.authenticate('twitch', { failureRedirect: '/login' }), 
  (req, res) => {
    const token = jwt.sign({ userId: req.user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.redirect(`/?token=${token}`);
  }
);

// YouTube Authentication
router.get('/youtube', passport.authenticate('youtube', { scope: ['https://www.googleapis.com/auth/youtube'] }));

router.get('/youtube/callback', passport.authenticate('youtube', { failureRedirect: '/login' }), 
  (req, res) => {
    const token = jwt.sign({ userId: req.user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.redirect(`/?token=${token}`);
  }
);

// TikTok Authentication
router.get('/tiktok', (req, res) => {
  const clientId = process.env.TIKTOK_CLIENT_ID;
  const redirectUri = process.env.TIKTOK_REDIRECT_URI;
  const scope = 'user.info.basic,video.upload';
  const tiktokAuthUrl = `https://www.tiktok.com/v1/oauth/authorize?client_key=${clientId}&response_type=code&scope=${scope}&redirect_uri=${redirectUri}`;
  res.redirect(tiktokAuthUrl);
});

router.get('/tiktok/callback', async (req, res) => {
  try {
    const { code } = req.query;
    // Handle TikTok token exchange
    const token = jwt.sign({ userId: req.user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.redirect(`/?token=${token}`);
  } catch (error) {
    res.status(500).json({ error: 'Authentication failed' });
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ error: 'Logout failed' });
    res.json({ message: 'Logged out successfully' });
  });
});

// Get current user
router.get('/me', (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  res.json(req.user);
});

module.exports = router;
