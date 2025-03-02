const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config();
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

app.post('/login', (req, res) => {
    // Authenticate user(waiting for implementation)


    // Create a token
    const username = req.body.username;
    const user = { name: username };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken: accessToken }); // Send the token to the client
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