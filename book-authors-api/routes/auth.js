const express = require('express');
const router = express.Router();
const passport = require('../../passport'); // correct relative path from routes folder

// Login route redirect to Google
router.get(
  '/login',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
// Google callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/login' }),
  (req, res) => {
    // After successful login, redirect to dashboard/home
    res.redirect('/profile'); // or '/' if you have a home route
  }
);

// Logout
router.get('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.redirect('/auth/login');
  });
});

// Protected profile route
router.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'You are not logged in' });
  }
  res.json({
    message: 'You are logged in!',
    user: {
      name: req.user.displayName,
      email: req.user.emails ? req.user.emails[0].value : null,
    },
  });
});

module.exports = router;