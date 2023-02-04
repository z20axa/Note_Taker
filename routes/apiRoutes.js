// packages and modules import
const router = require('express').Router(); // express router
var data = require('../db/db.json'); // notes JSON data file
const fs = require('fs'); // file system to write notes
const path = require('path'); // path package
const { v4: uuidv4 } = require('uuid'); // id generator for note

// GET route to get/display all of the notes
router.get('/notes', (req, res) => {
    // res.json() allows us to return JSON instead of a buffer, string, or static file
    res.json(data);
});

// POST route to add new notes
router.post('/notes', (req, res) => {
    // console.log(req.body);

    // add new note entered to the note data array and assign a generated unique id 
    data.push({ ...req.body, id: uuidv4()});

    // write new note to the note data file
    fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(data), (err) => {
        if (err) {
            console.error(err);
            // return error
            res.status(500).send("Error!");
        } else {
            // return JSON data 
            res.status(200).json(req.body);
        }
    });
});

// BONUS 
// DELETE route to delete existing notes
router.delete('/notes/:id', (req, res) => {
    // id const declaration for note to delete
    const id = req.params.id;

    // filter/look the note data array by its id and deletes it from the notes
    data = data.filter((idReq) => idReq.id !== id);

    // write new note to the note data file excluding the note deleted
    fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(data), (err) => {
        if (err) {
            console.error(err);
            // return error
            res.status(500).send("Error!");
        } else {
            // return JSON data
            res.status(200).json(data);
        }
    });
});

module.exports = router;