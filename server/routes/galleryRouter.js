const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');
const bodyParser = require('body-parser');

router.get('/', function (req, res) {
    const sqlText = `SELECT * FROM photos`;
    pool.query(sqlText) 
    .then(function (result) {
        res.send(result);
    }).catch(function (error) {
        console.log('on get: ',error);
    })
});


module.exports = router;