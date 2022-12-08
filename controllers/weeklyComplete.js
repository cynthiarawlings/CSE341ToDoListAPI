// ***********
// controllers Weekly Complete

const mongodb = require('../connections/index');
const ObjectId = require('mongodb').ObjectId;

// GET by ID (Called by the user)
const getWeeklyCompleteById = async (req, res) => {
    try {
        const listId = new ObjectId(req.params.id);
        if (!listId) {
            res.status(400).send({ message: 'Invalid weekly completed List ID supplied.' });
            return;
        }
        await mongodb.getDb().db('CSE341ToDoListAPI').collection('weeklyComplete').find({ _id: listId }).toArray()
            .then((result) => {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(result);
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || 'Some error occurred while retrieving the weekly completed List.'
                });
            });
    } catch (err) {
        res.status(500).json(err);
    }
};

// PUT Add Tasks (Called by the user)
const addTaskWeeklyComplete = async (req, res) => {
    try {
        const listId = new ObjectId(req.params.id);
        if (!listId) {
            res.status(400).send({ message: 'Invalid list ID supplied.' });
            return;
        }
        const oldList = await mongodb.getDb().db('CSE341ToDoListAPI').collection('weeklyComplete').find({ _id: listId }).toArray();
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
        const response = await mongodb.getDb().db('CSE341ToDoListAPI').collection('weeklyComplete').replaceOne({ _id: listId }, tasks);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the Daily To Do List.');
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const removeTaskWeeklyComplete = async (req, res) => {
    try {
      const listId = new ObjectId(req.params.id);
      const response = await mongodb.getDb().db('CSE341ToDoListAPI').collection('weeklyComplete').deleteOne({ _id: listId }, true);
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

module.exports = { getWeeklyCompleteById, addTaskWeeklyComplete, removeTaskWeeklyComplete };
