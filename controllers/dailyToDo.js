// ***********
// controllers/dailyToDo.js

const mongodb = require('../connections/index');
const ObjectId = require('mongodb').ObjectId;

// *******
// Note there is no get all because the user will supply thier id for thier personal list
// I still need to do put
// Post happens in the user file when the user is created
// Delete will happen when the user is deleted so it will hapen in the user file

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

// PUT Add Tasks (Called by the user)
const addTaskDailyToDo = async (req, res) => {
    try {
        const listId = new ObjectId(req.params.id);
        if (!listId) {
            res.status(400).send({ message: 'Invalid list ID supplied.' });
            return;
        }
        // const auth0Identifier = req.params.identifier;
        // I need to figure out how to check for the amout of tasks
        // and make a loop to go through all of them
        // This is to see if I can just append to a document without
        // needing or removing all previous tasks
        const options = { upsert: false };
        // Add a cap to not overwhelm the db
        // The current setup will overide the database so I will need to retrieve
        // The old information and add it before the new information.
        



        let i = 1;
        let body = req.body;
        let tasks = {};
        do {
            let key = 'task' + i;
            let task = body[key];
            if (!task) {
                break;
            }
            tasks[key] = task;
            i++;
        }
        while (true);
        const readyTasks = {
            $Set: tasks
        };
        // const filter = { _id: listId };
        // const response = await mongodb.getDb().db('CSE341ToDoListAPI').collection('dailyToDo').replaceOne({ _id: listId }, tasks);
        const response = await mongodb.getDb().db('CSE341ToDoListAPI').collection('dailyToDo').updateOne({ _id: listId }, readyTasks, options);
        // console.log(response);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            // console.log(response);
            res.status(500).json(response.error || 'Some error occurred while updating the Daily To Do List.');
        }
    } catch (err) {
        // console.log(response);
        res.status(500).json(err);
    }
}


module.exports = { getDailyToDListById, addTaskDailyToDo };
