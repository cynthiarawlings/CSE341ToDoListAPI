// ***********
// controllers/dailyToDo.js

const mongodb = require('../connections/index');
const ObjectId = require('mongodb').ObjectId;

// *******
// Note there is no get all because the user will supply thier id for thier personal list
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


// PUT Remove tasks OR Add Tasks (Called by the user)
const updateTasksDailyToDo = async (req, res) => {
    try {
        const listId = new ObjectId(req.params.id);
        if (!listId) {
            res.status(400).send({ message: 'Invalid list ID supplied.' });
            return;
        }
        // Check if adding or removing
        let body = req.body;
        const oldList = await mongodb.getDb().db('CSE341ToDoListAPI').collection('dailyToDo').find({ _id: listId }).toArray();
        let tasks = {};
        if(body["remove0"]) {
            // If removing tasks
            // Get a list of the tasks to be removed
            let removeTasksList = [];
            let i = 0;
            do {
                let refRemove = 'remove' + i;
                if (body[refRemove]) {
                    removeTasksList.push(body[refRemove]);
                }
                else {
                    break;
                }
                i++;
            }
            while (true);
            // Create the new task List
            let j = 0;
            let newKeynum = 0;
            do {
                let refTask = 'task' + j;
                let newKey = 'task' + newKeynum;
                // Check if we have finished the list
                if (!oldList[0][refTask]) {
                    break;
                }
                if (!removeTasksList.includes(refTask)) {
                    tasks[newKey] = oldList[0][refTask];
                    newKeynum++;
                }
                j++;
            }
            while (true);   
        }
        else {
            // If adding tasks
            let currentTaskNumber = 0;
            let j = 0;
            do {
                let refTask = 'task' + j;
                if (!oldList[0][refTask]) {
                    currentTaskNumber = j;
                    break;
                }
                j++;
            }
            while (true);
            let newKeyNum = currentTaskNumber;
            let i = 0;
            tasks = oldList[0];
            do {
                let key = 'task' + i;
                let newKey = 'task' + newKeyNum;
                let task = body[key];
                if (!task) {
                    break;
                }
                tasks[newKey] = task;
                i++;
                newKeyNum++;
            }
            while (true);
        }
        try {
            const response = await mongodb.getDb().db('CSE341ToDoListAPI').collection('dailyToDo').replaceOne({ _id: listId }, tasks);
            if (response.modifiedCount > 0) {
                res.status(204).send();
            } else {
                res.status(500).json(response.error || 'Some error occurred while updating the Daily To Do List. Make sure that you are only adding or only removing.');
            }
        }catch (err) {
            res.status(500).json(err);
        }
    } catch (err) {
        res.status(500).json(err);
    }
}


module.exports = { getDailyToDListById, updateTasksDailyToDo };
