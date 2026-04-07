const express = require('express');
const router = express.Router();
const passport = require('../../passport');

// Login route – starts Google OAuth
router.get(
  '/login',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account'
  })
);

// Google OAuth callback – after successful login, redirect to profile page
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/login',
    session: true,
  }),
  (req, res) => {
    // ✅ Now redirect to /auth/profile to show logged-in status
    res.redirect('/auth/profile');
  }
);

// Logout route
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
});

// Profile route – displays user info in HTML (shows "you are logged in")
router.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send(`
      <h1>Not logged in</h1>
      <p><a href="/auth/login">Login with Google</a></p>
    `);
  }

  // Send an HTML page that clearly shows the user is logged in
  res.send(`
    <!DOCTYPE html>
    <html>
      <head><title>Logged In</title></head>
      <body>
        <h1>✅ You are logged in!</h1>
        <p><strong>Name:</strong> ${req.user.displayName}</p>
        <p><strong>Email:</strong> ${req.user.emails?.[0]?.value || 'No email provided'}</p>
        <p><strong>Google ID:</strong> ${req.user.id}</p>
        <p><a href="/auth/logout">Logout</a> | <a href="/api-docs">Go to API Docs</a></p>
      </body>
    </html>
  `);
});

module.exports = router;