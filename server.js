const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// Parse URL-encoded bodies (from HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // serve your HTML, CSS, JS

// Temporary in-memory database (will reset on restart)
let users = [];

// Serve login page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

// Handle login POST
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Simple example: check if user exists
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.send('Login successful!');
  } else {
    res.send('Invalid credentials');
  }
});

// Handle signup (if you want)
app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  users.push({ username, password });
  res.send('User registered!');
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));