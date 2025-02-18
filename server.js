const express = require('express');
const app = express();
const port = 3000;
const jwt = require('jsonwebtoken');

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

app.get('/posts', (req, res) => {
    res.json(posts);
});

app.get('/login', (req, res) => {
    // Authenticate user
});

app.listen(port);