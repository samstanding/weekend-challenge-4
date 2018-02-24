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

router.post('/:id', function (req, res) {
    const id = req.params.id;
    let comment = req.body;
    const sqlText = `INSERT INTO comments (comments, photo_id, author) VALUES ($1, $2, $3);`;
    pool.query(sqlText, [comment.commentContent, id, comment.commentName])
    .then(function (result) {
        res.sendStatus(200);
    }).catch(function (error) {
        console.log('on comment post', error);
    })
})

router.get('/:id', function (req, res) {
    const id = req.params.id;
    const sqlText = `SELECT * FROM comments WHERE photo_id=$1;`;
    pool.query(sqlText, [id])
    .then(function (result) {
        res.send(result);
    }).catch(function (error) {
        console.log(`error on comment get: ${error}`);
    })
})

module.exports = router;