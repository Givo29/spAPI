const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const compliment = require('./Models/compliment');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/api/compliment", (req, res) => {
    Compliment.findOne({}, (err, compliment) => {
        if (err) return console.log(err);
        res.send(compliment);
    })
});

app.post("/api/compliment", (req, res) => {
    const comp = new Compliment({
        string: req.body.string,
    });
    comp.save()
    .then(val => {
        res.json({ msg: "Compliment added", val: val })
    });
});

mongoose.connect('mongodb://root:password@api-database:27017', { useNewUrlParser: true });

mongoose.connection.once('open',_ => {
    console.log('Database connected Successfully');
})
.on('error', err => {
    console.log('Error', err);
});

// MongoClient.connect('mongodb://root:password@api-database:27017', { useUnifiedTopology: true })
// .then(client => {
//     console.log('Connected to database');
//     const db = client.db('api');
// });

app.get("/", (req, res) => {
    res.send("Hello There");
});

app.get("/hello", (req, res) => {
    res.send("There");
});

app.listen(3000, _ => {
    console.log("http://localhost:10080");
});