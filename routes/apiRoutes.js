const router = require('express').Router();
const data = require('../db/db.json');
const fs = require('fs');


router.get('/notes', (req, res) => {
    res.json(data);
});

router.post('/notes', (req, res) => {
    // console.log(req);
    console.log(req.body);
    // if (typeof req.body.tittle !== 'undefined' &&
    //     typeof req.body.text !== 'undefined'
    // ) {
        data.push({ ...req.body });
        console.log(data);
        // return fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(data), (err) => {
        //     err ? console.error(err) : console.log("File Written!");
        //     return res.status(200).json(req.body);
    //     // });
    // }
    // return res.status(500).send("Error!");
});

module.exports=router;