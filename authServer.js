// 3001

require('dotenv').config();
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const PORT = process.env.AuthPort;

app.use(express.json());

app.post('/token', (req, res) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) return res.sendStatus(401);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const accessToken = generateAccessToken({ name: user.name });
        res.json({ accessToken: accessToken });
    });
});

app.post('/login', (req, res) => {
    // Authenticate user(waiting for implementation)

    // Create a token
    const username = req.body.username;
    const user = { name: username };
    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    res.json({ accessToken: accessToken, refreshToken: refreshToken }); // Send the token to the client
});

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
}


app.listen(PORT);
console.log(`Auth server is running on port ${PORT}`);