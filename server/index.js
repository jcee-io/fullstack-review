"use strict"
const bodyParser = require('body-parser');
const express = require('express');
const github = require('../helpers/github');
const db = require('../database/index');
const pg = require('pg');

let app = express();

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  github(req.body.username);
  res.redirect('/repos');
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos

  db.find()
  .then(data => {
  	res.json(data);
  });

});

app.listen(process.env.PORT || 1128, process.env.IP || 'localhost', function() {
  console.log(`SERVER START`);
});

