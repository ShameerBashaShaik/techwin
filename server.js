const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000; // Use Render's port or fallback to 3000

// Serve static files (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname)));

// Serve open.html as default
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'open.html')));

// Start server
app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}`);
});