// 3000

require('dotenv').config();
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const PORT = process.env.NodejsPort;

app.use(express.json());

const posts = [
    {
        username: "adam",
        title: "This is the first post"
    },
    {
        username: "bob",
        title: "This is the second post"
    }
];

app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name));
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    // console.log(token);
    if (token == null) return res.sendStatus(401); // If there is no token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // If the token is invalid
        req.user = user;
        next(); // If the token is valid, continue
    });
}

app.listen(PORT);
console.log(`Node.js server is running on port ${PORT}`);