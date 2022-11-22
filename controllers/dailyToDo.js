// ***********
// controllers/dailyToDo.js

const mongodb = require('../connections/index');
const ObjectId = require('mongodb').ObjectId;

// *******
// Note there is no get all because the user will supply thier id for thier personal list
// I still need to do post, put, and delete

// GET by ID (Called by the user)
const getDailyToDListById = async (req, res) => {
    try {
        const listId = new ObjectId(req.params.id);
        if (!listId) {
            res.status(400).send({ message: 'Invalid Daily To Do List ID supplied.' });
            return;
        }
        await mongodb.getDb().db('CSE341ToDoListAPI').collection('dailyToDo').find({ _id: listId }).toArray()
            .then((result) => {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(result);
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || 'Some error occurred while retrieving the Daily To Do List.'
                });
            });
    } catch (err) {
        res.status(500).json(err);
    }
};

// POST (Called by the application when the user is created, should make an empty list)
const createDailyToDList = async (req, res) => {
    try {
        const list = {
            demo: req.body.demo
        };
        const response = await mongodb.getDb().db('CSE341ToDoListAPI').collection('dailyToDo').insertOne(list);
        // console.log(response.insertedId);
        if (response.acknowledged) {
            res.status(201).json(response);
            // ***********
            // Now the list Id needs to be added to the User database
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the list.');
        }
    } catch (err) {
        res.status(500).json(err);
    }
};


// module.exports = { getAllCharacters, getCharacterById, createCharacter, updateCharacter, deleteCharacter };
module.exports = { getDailyToDListById, createDailyToDList };