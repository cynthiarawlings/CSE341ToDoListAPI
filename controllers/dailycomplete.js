// ***********
// controllers/dailyComplete.js

const mongodb = require('../connections/index');
const ObjectId = require('mongodb').ObjectId;

// *******
// Note there is no get all because the user will supply thier id for thier personal list
// Post happens in the user file when the user is created
// Delete will happen when the user is deleted so it will hapen in the user file
// Removing tasks from the list will happen in dailyComplete

// GET by ID (Called by the user)
const getDailyCompleteById = async (req, res) => {
    try {
        const listId = new ObjectId(req.params.id);
        if (!listId) {
            res.status(400).send({ message: 'Invalid Daily Complete To Do List ID supplied.' });
            return;
        }
        await mongodb.getDb().db('CSE341ToDoListAPI').collection('dailyComplete').find({ _id: listId }).toArray()
            .then((result) => {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(result);
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || 'Some error occurred while retrieving the Complete Daily To Do List.'
                });
            });
    } catch (err) {
        res.status(500).json(err);
    }
};

// PUT Add Tasks (Called by the user)
const addTaskDailyComplete = async (req, res) => {
    try {
        const listId = new ObjectId(req.params.id);
        if (!listId) {
            res.status(400).send({ message: 'Invalid list ID supplied.' });
            return;
        }
        const oldList = await mongodb.getDb().db('CSE341ToDoListAPI').collection('dailyComplete').find({ _id: listId }).toArray();
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
        let body = req.body;
        let tasks = oldList[0];
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
        const response = await mongodb.getDb().db('CSE341ToDoListAPI').collection('dailyComplete').replaceOne({ _id: listId }, tasks);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the Daily To Do List.');
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const removeTaskDailyComplete = async (req, res) => {
    try {
      const listId = new ObjectId(req.params.id);
      const response = await mongodb.getDb().db('CSE341ToDoListAPI').collection('dailyComplete').deleteOne({ _id: listId }, true);
      console.log(response);
      if (response.deletedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || 'And error occurred. Try again later!');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  };

module.exports = { getDailyCompleteById, addTaskDailyComplete, removeTaskDailyComplete };
