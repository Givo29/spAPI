const express = require('express');
const router = express.Router();
const path = require('path');
const User = require('../Models/user');

const requiresLogin = _ => {
    return (req, res, next) => {
        if (req.session && req.session.userId) {
            next();
        } else {
            res.redirect('/login');
        }
    }
}

router.get('/', requiresLogin(), (_, res) => {
    res.sendFile(path.join(__dirname, '..', 'Static', 'register.html'));
})

router.post('/', requiresLogin(), async (req, res) => {
    if (req.body.password !== req.body.password_retype) {
        return res.json({ message: "Passwords do not match" });
    }
    const user = new User({
        userName: req.body.username,
        password: req.body.password
    });

    try {
        await user.save();
        res.redirect('/login');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;