const express = require('express');
const router = express.Router();
const Compliment = require('../Models/compliment');


const requiresLogin = _ => {
    return (req, res, next) => {
        if (req.session && req.session.userId) {
            next();
        } else {
            res.status(401).json({ message: "You must be logged in to view this page" });
        }
    }
}

router.get('/', async (_, res) => {
    try {
        let count = await Compliment.estimatedDocumentCount();
        let random = Math.floor(Math.random() * count);
        const compliment = await Compliment.findOne().skip(random);
        res.json({ string: compliment.string })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', requiresLogin(), async (req, res) => {
    const compliment = new Compliment({
        string: req.body.string
    });

    try {
        const newCompliment = await compliment.save();
        res.status(201).json(newCompliment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;