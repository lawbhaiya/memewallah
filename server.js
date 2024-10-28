const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from the 'memes' directory
app.use('/memes', express.static(path.join(__dirname, 'memes')));

// Endpoint to get meme files
app.get('/api/memes', (req, res) => {
    const memesDir = path.join(__dirname, 'memes');
    fs.readdir(memesDir, (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan directory: ' + err);
        }
        // Filter for common image formats: jpg, jpeg, png, gif, webp
        const memeFiles = files.filter(file => /\.(jpg|jpeg|png|gif|webp)$/.test(file));
        res.json(memeFiles);
    });
});

// Serve the HTML file from the public directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 404 handler for unmatched routes
app.use((req, res) => {
    res.status(404).send('Sorry, page not found');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});