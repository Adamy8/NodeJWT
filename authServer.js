require('dotenv').config();
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const PORT = process.env.AuthPort;

app.use(express.json());

app.post('/login', (req, res) => {
    // Authenticate user(waiting for implementation)


    // Create a token
    const username = req.body.username;
    const user = { name: username };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken: accessToken }); // Send the token to the client
});



app.listen(PORT);
console.log(`Auth server is running on port ${PORT}`);