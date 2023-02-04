// packages and modules import
const router = require('express').Router(); // express router
var data = require('../db/db.json'); 
const fs = require('fs');
const path = require('path'); // 
const { v4: uuidv4 } = require('uuid'); // id generator 

// GET route to get/display all of the notes
router.get('/notes', (req, res) => {
    // res.json() allows us to return JSON instead of a buffer, string, or static file
    res.json(data);
});

// POST route to add new notes
router.post('/notes', (req, res) => {
    // console.log(req.body);


    data.push({ ...req.body, id: uuidv4()});

    fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(data), (err) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error!");
        } else {
            res.status(200).json(req.body);
        }
    });
});

// BONUS 
// DELETE route to delete existing notes
router.delete('/notes/:id', (req, res) => {
    const id = req.params.id;

    data = data.filter((idReq) => idReq.id !== id);

    fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(data), (err) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error!");
        } else {
            res.status(200).json(data);
        }
    });
});

module.exports = router;