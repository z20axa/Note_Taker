const express = require('express');
const path = require('path');
const data = require('./db/db.json');
const fs = require('fs');

const app = express();
const PORT = 4001;

app.use(express.static('public'));

// body parsing
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// app.get('/', (req, res) => {
//   res.send("Homepage");
// });

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "notes.html"));
  });

app.get('/api/notes', (req, res) => {
  res.json(data);
});

app.post('/api/data', (req, res) => {
  // console.log(req);
  // console.log(req.body);
  if(typeof req.body.name !== 'undefined' &&
  typeof req.body.description !== 'undefined'
  ){
    data.push({ ...req.body });
    console.log(data);
    return fs.writeFile(path.join(__dirname, "db.json"), JSON.stringify(data), (err) => {
      err ? console.error(err) : console.log("File Written!");
      return res.status(200).json(req.body);
    });
  }
  return res.status(500).send("Error!");
});

app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}/`);
});