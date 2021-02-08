const express = require('express');
const router = express.Router();
const path = require('path');


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
    res.sendFile(path.join(__dirname, '..', 'Static', 'admin.html'));
})

module.exports = router;