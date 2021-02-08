const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()

// Routes
const complimentRoute = require('./Routes/compliments');

const app = express();
app.use(express.json());
app.use('/api/compliment', complimentRoute);

mongoose.connect(`${ process.env.MONGO_URI }${ process.env.MONGO_INITDB_DATABASE }`, {
    'auth': { 'authSource': 'admin' },
    'user': process.env.MONGO_INITDB_ROOT_USERNAME,
    'pass': process.env.MONGO_INITDB_ROOT_PASSWORD,
    'useMongoClient': true
});

mongoose.connection.on('error', err => {
    console.log('Error', err);
});
mongoose.connection.once('open', _ => {
    console.log('Database connected Successfully');
});

app.listen(3000, _ => {
    console.log('Server Started');
});