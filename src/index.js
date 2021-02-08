const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
require('dotenv').config()

// Routes
const complimentRoute = require('./Routes/compliments');
const registerRoute = require('./Routes/register');
const loginRoute = require('./Routes/login');
const logoutRoute = require('./Routes/logout');
const adminRoute = require('./Routes/admin')

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false
}));
app.use('/api/compliment', complimentRoute);
app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/logout', logoutRoute);
app.use('/admin', adminRoute);

mongoose.connect(`${ process.env.MONGO_URI }${ process.env.MONGO_INITDB_DATABASE }`, {
    'auth': { 'authSource': 'admin' },
    'user': process.env.MONGO_INITDB_ROOT_USERNAME,
    'pass': process.env.MONGO_INITDB_ROOT_PASSWORD,
    'useMongoClient': true
});
// Create default user
require('./seed');

mongoose.connection.on('error', err => {
    console.log('Error', err);
});
mongoose.connection.once('open', _ => {
    console.log('Database connected Successfully');
});

app.listen(3000, _ => {
    console.log('Server Started');
});