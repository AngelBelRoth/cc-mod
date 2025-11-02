const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config();

var db, collection;

// const url = "mongodb+srv://demo:demo@cluster0-q2ojb.mongodb.net/test?retryWrites=true";
const url = process.env.DB_STRING;
const dbName = "demo";

app.listen(8282, () => {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
      throw error;
    }
    db = client.db(dbName);
    console.log("Connected to `" + dbName + "`!");
  });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('messages').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', { messages: result })
  })
})

app.post('/messages', (req, res) => {
  db.collection('messages').findOneAndUpdate({}, {
    $set: {
      brand: req.body.brand,
      company: req.body.company,
      year: req.body.year,
      hq: req.body.hq,
      location: req.body.location,
      person: req.body.person,
      position: req.body.position,
      number: req.body.number,
      email: req.body.email,
      website: req.body.website,
      why: req.body.why,
      offer: req.body.offer,
      looking: req.body.looking,
      unique: req.body.unique,
      else: req.body.else,
      moonshot: req.body.moonshot
    }
  }, { upsert: true }, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    console.log(result)
    res.redirect('/')
  })
})