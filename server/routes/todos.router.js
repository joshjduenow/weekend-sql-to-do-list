const router = require('express').Router();
const pool = require('../modules/pool');
const express = require('express');

// GET ROUTE
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "todos";';
    pool.query(queryText).then(result => {
        console.log('in router.get',);
        res.send(result.rows);
    })
        .catch(error => {
            console.log('error with todo list', error);
            res.sendStatus(500);
        });
});

// POST ROUTE
router.post('/', (req, res) => {
    let newToDo = req.body;
    console.log('Adding TO-DO', newToDo);

    let queryText = `INSERT INTO "todos" ("text")
                     VALUES ($1);`;
    pool.query(queryText, [newToDo.name])
        .then(result => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log('Error adding new todo', error);
            res.sendStatus(500);
        });
});


module.exports = router;
