const router = require('express').Router();
const pool = require('../modules/pool');
const express = require('express');

// GET ROUTE
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "todos" ORDER BY "text";';
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
    pool.query(queryText, [newToDo.text])
        .then(result => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log('Error adding new todo', error);
            res.sendStatus(500);
        });
});

// DELETE ROUTE
router.delete('/:id', (req, res) => {
    let idToDelete = req.params.id;
    let queryText = 'DELETE FROM "todos" WHERE "id" = $1;';

    const sqValues = [idToDelete]
    pool.query(queryText, sqValues)
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((dbError) => {
            console.log("delete koala failed", dbError);
            res.sendStatus(500);
        })
});

// PUT ROUTE
router.put('/:id', (req, res) => {
    let idToUpdate = req.params.id;
    let queryText = 'UPDATE "todos" SET "isComplete" = true WHERE "id" = $1;';

    const sqValues = [idToUpdate]
    pool.query(queryText, sqValues)
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((dbError) => {
            console.log("mark todo complete failed", dbError);
            res.sendStatus(500);
        })
});
module.exports = router;
