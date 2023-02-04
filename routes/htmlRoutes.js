// packages and modules import
const router = require('express').Router();
const path = require('path');

// GET route to get/display all of the notes
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});

// fallback route for when a user attempts to visit routes that don't exist
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;