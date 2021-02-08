const express = require('express');
const router = express.Router();
const path = require('path');
const User = require('../Models/user');

router.get('/', (_, res) => {
    res.sendFile(path.join(__dirname, '..', 'Static', 'login.html'));
})

router.post('/', async (req, res) => {
    User.authenticate(req.body.username, req.body.password, (err, user) => {
        if (err || !user) return res.status(401).json({ message: "Wrong username or password" });
        req.session.userId = user._id;
        return res.redirect('/admin');
    });
});

module.exports = router;