const express = require('express');
const router = express.Router();
const path = require('path');
const Compliment = require('../Models/compliment');


const requiresLogin = _ => {
    return (req, res, next) => {
        if (req.session && req.session.userId) {
            next();
        } else {
            res.redirect('/login');
        }
    }
}

router.get('/', (_, res) => {
    let response = {
        "endpoints": [
            "GET /compliment"
        ]
    };
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response, null, 3));
});

// Compliment Routes
router.get('/compliment', async (_, res) => {
    try {
        let count = await Compliment.estimatedDocumentCount();
        let random = Math.floor(Math.random() * count);
        const compliment = await Compliment.findOne().skip(random);
        res.json({ string: compliment.string })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/compliment', requiresLogin(), async (req, res) => {
    const compliment = new Compliment({
        string: req.body.string
    });

    try {
        await compliment.save();
        res.redirect('/compliment/new');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/compliment/new', requiresLogin(), (_, res) => {
    res.sendFile(path.join(__dirname, '..', 'Static', 'newCompliment.html'));
});


module.exports = router;