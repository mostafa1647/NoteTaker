var express = require('express');
var router = express.Router();
var fs = require('fs');
const { default: ShortUniqueId } = require('short-unique-id');
const mongoose = require('mongoose');
const Notes = require('../db/models/Notes');

// initialize uid
var uid = new ShortUniqueId();

/* GET home page. */
router.get('/notes', (req, res, next) => {
    fs.readFile('./public/notes.html', (err, data) => {
        if(err) {
            throw err;
        }
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.end(data);
    })
});

router.get('/api/notes', async (req, res, next) => {
    // fs.readFile('./db/db.json', (err, data) => {
    //     if(err) {
    //         throw err;
    //     }
    //     res.writeHead(200, {
    //         'Content-Type': 'application/json'
    //     });
    //     res.end(data);
    // });
    try {
        const results = await Notes.find();
        res.json(results);
    } catch (e) {
        res.status(404).json({
            Error: e.message
        })
    }
});

router.post('/api/notes', async (req, res, next) => {
    // fs.readFile('./db/db.json', (err, data) => {
    //     if(err) {
    //         throw err;
    //     }
    //     // add new note to db
    //     let currentDB = JSON.parse(data);
    //     let newData = req.body;
    //     newData.id = uid();
    //     currentDB.push(newData);
    //     fs.writeFile('./db/db.json', JSON.stringify(currentDB), error => {
    //         if(error) {
    //             throw error;
    //         }
    //     });
    //
    //     // end response
    //     res.writeHead(201, {
    //         'Content-Type': 'application/json'
    //     });
    //     res.end(JSON.stringify(newData));
    // })
    try {
        const newNote = new Notes(req.body);
        const result = await newNote.save();
        res.status(201).json(result);
    } catch (e) {
        res.status(500).json({
            Error: e.message
        })
    }
});

router.put('/api/notes/:id', async (req, res) => {
    try {
        const result = await Notes.findOneAndUpdate({
            _id: req.params.id
        }, req.body)
        res.status(201).json(result);
    } catch (e) {
        res.status(500).json({
            Error: e.message
        })
    }
})

router.delete('/api/notes/:id', async (req, res, next) => {
    // fs.readFile('./db/db.json', (err, data) => {
    //     if(err) {
    //         throw err;
    //     }
    //     // add new note to db
    //     let currentDB = JSON.parse(data);
    //     let { id } = req.params;
    //     let newDB = currentDB.filter(item => {
    //         return (item.id !== id);
    //     });
    //     fs.writeFile('./db/db.json', JSON.stringify(newDB), error => {
    //         if(error) {
    //             throw error;
    //         }
    //     });
    //     // end response
    //     res.writeHead(201, {
    //         'Content-Type': 'application/json'
    //     });
    //     res.end(JSON.stringify({
    //         status: 'Success'
    //     }));
    // })
    try {
        await Notes.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: "Success"
        })
    } catch (e) {
        res.status(500).json({
            Error: e.message
        })
    }
});

router.get('/*', function(req, res, next) {
    fs.readFile('./public/index.html', (err, data) => {
        if(err) {
            throw err;
        }
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.end(data);
    })
});
module.exports = router;
