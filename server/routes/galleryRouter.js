const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');
const bodyParser = require('body-parser');

router.get('/', function (req, res) {
    const sqlText = `SELECT * FROM photos ORDER BY id`;
    pool.query(sqlText) 
    .then(function (result) {
        res.send(result);
    }).catch(function (error) {
        console.log('on get: ',error);
    })
});

router.put('/:id', function (req, res) {
    const id = req.params.id;
    const sqlText = `UPDATE photos SET like_count = like_count + 1 WHERE id =$1;`;
    pool.query(sqlText, [id])
    .then(function (result) {
        res.sendStatus(200);
    }).catch(function (error) {
        console.log('on put: ', error);
    })
})

router.put('/count/:id', function (req, res) {
    const id = req.params.id;
    const sqlText = `UPDATE photos SET view_count = view_count + 1 WHERE id =$1;`;
    pool.query(sqlText, [id])
    .then(function (result) {
        res.sendStatus(200);
    }).catch(function (error) {
        console.log('on put: ', error);
    })
})

module.exports = router;