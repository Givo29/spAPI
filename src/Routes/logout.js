const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) return res.json(err);
            return res.redirect('/');
        });
    }
});

module.exports = router;