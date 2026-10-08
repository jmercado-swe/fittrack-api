const express = require('express');
const router = express.Router();
const passport = require('passport');

// Kicks off the Google OAuth login flow.
router.get('/login', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google redirects back here after the user logs in.
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.status(200).json({ message: 'Logged in successfully', user: req.user });
    }
);

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.status(200).json({ message: 'Logged out successfully' });
    });
});

// Lets the frontend (or the video demo) check whether a session is active.
router.get('/status', (req, res) => {
    if (req.isAuthenticated && req.isAuthenticated()) {
        return res.status(200).json({ loggedIn: true, user: req.user });
    }
    res.status(200).json({ loggedIn: false });
});

module.exports = router;
