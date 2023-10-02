const express = require('express');
const fileUpload = require('express-fileupload');
const { v4: uuidv4 } = require('uuid');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(fileUpload());

// Serve the HTML file for the front end
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/zipfiles', (req, res) => {
    if (!req.files || !req.files.files) {
        return res.status(400).json({ error: 'No files were uploaded.' });
    }

    const files = req.files.files;
    const tempDir = path.join(__dirname, 'temp'); // Temporary directory

    // Create a unique folder for each upload
    const uniqueFolder = uuidv4();
    const uploadDir = path.join(tempDir, uniqueFolder);

    files.mv(uploadDir, (err) => {
        if (err) {
            return res.status(500).json({ error: 'File upload failed.' });
        }

        // Compress files using a command-line tool (7-Zip)
        const destination = path.join(__dirname, 'destination', `${uniqueFolder}.zip`);
        const command = `7z a -v1m "${destination}" "${uploadDir}"`;

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                return res.status(500).json({ error: 'File compression failed.' });
            }

            if (stderr) {
                console.error(`Standard error: ${stderr}`);
                return res.status(500).json({ error: 'File compression failed.' });
            }

            console.log(`Standard output: ${stdout}`);
            return res.status(200).json({ success: 'File compression successful', filename: `${uniqueFolder}.zip` });
        });
    });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
