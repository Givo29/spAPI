const express = require('express');
const mongoose = require('mongoose');

// Routes
const complimentRoute = require('./Routes/compliments');

const app = express();
app.use(express.json());
app.use('/api/compliment', complimentRoute);

mongoose.connect('mongodb://api-database:27017/api', {
    'auth': { 'authSource': 'admin' },
    'user': 'root',
    'pass': 'password',
    'useMongoClient': true
});

mongoose.connection.on('error', err => {
    console.log('Error', err);
});
mongoose.connection.once('open', _ => {
    console.log('Database connected Successfully');
});

app.listen(3000, _ => {
    console.log("http://localhost:10080");
});