const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname)));


app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'ope.html')));


// Handle form submission
app.post('/submit', async (req, res) => {
    try {
        const { firstName, lastName, email, phone, subject, message, newsletter, timestamp } = req.body;
        console.log('Received form data:', { firstName, lastName, email, phone, subject, message, newsletter, timestamp });

        // Format data as table-like row
        const row = `${firstName} | ${lastName} | ${email} | ${phone} | ${subject} | ${message} | ${newsletter} | ${timestamp}\n`;

        // Append to submissions.txt (create if it doesn't exist)
        const filePath = path.join(__dirname, 'submissions.txt');
        try {
            // Check if file exists and is empty
            let fileContent = '';
            try {
                fileContent = await fs.readFile(filePath, 'utf8');
            } catch (error) {
                if (error.code !== 'ENOENT') throw error; // Ignore if file doesn't exist
            }

            // Add header only if file is empty
            if (!fileContent) {
                fileContent = 'First Name | Last Name | Email | Phone | Subject | Message | Newsletter | Timestamp\n';
                fileContent += '--------------------------------------------------------------------------------\n';
            }

            // Append new row
            await fs.appendFile(filePath, row);
            console.log('Data appended to submissions.txt');
            res.status(200).send('Submission saved');
        } catch (error) {
            console.error('Error appending to file:', error);
            res.status(500).send('Error saving submission');
        }
    } catch (error) {
        console.error('Error processing submission:', error);
        res.status(500).send('Error processing submission');
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}`);
});