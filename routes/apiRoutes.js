const router = require('express').Router();
const data = require('../db/db.json');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');


router.get('/notes', (req, res) => {
    res.json(data);
});

router.post('/notes', (req, res) => {

    // console.log(req);
    console.log(req.body);
    // if (typeof req.body.tittle !== 'undefined' &&
    //     typeof req.body.text !== 'undefined'
    // ) {
        data.push({ ...req.body, id:uuidv4() });
        // console.log(data);
        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(data), (err) => {
            // err ? console.error(err) : console.log("File Written!");
            if (err) {
                console.error(err);
                res.status(500).send("Error!");
            } else {
                res.status(200).json(req.body);
            }
                
        });
    // }
    // return res.status(500).send("Error!");
});

module.exports=router;