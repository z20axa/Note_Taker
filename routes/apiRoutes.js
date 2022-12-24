const router = require('express').Router();
var data = require('../db/db.json');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

router.get('/notes', (req, res) => {
    res.json(data);
});

router.post('/notes', (req, res) => {
    // console.log(req);
    console.log(req.body);
    data.push({ ...req.body, id: uuidv4()});
    // console.log(data);
    fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(data), (err) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error!");
        } else {
            res.status(200).json(req.body);
        }
    });
});

router.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    // console.log('ID', id);

    data = data.filter((idReq) => idReq.id !== id);
        // console.log(data);

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