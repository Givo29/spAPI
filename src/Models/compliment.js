const mongoose = require('mongoose');

const ComplimentSchema = new mongoose.Schema({
    string: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Compliment', ComplimentSchema);