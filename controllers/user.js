// ***********
// controller/user.js


const mongodb = require('../connections/index');
const ObjectId = require('mongodb').ObjectId;


const getUserLists = async (req, res) => {
    console.log("get list function");
    try {
        const userId = new ObjectId(req.params.id);
        if (!userId) {
            res.status(400).send({ message: 'No Id supplied.' });
            return;
        }
        await mongodb.getDb().db('CSE341ToDoListAPI').collection('users').find({ _id: userId }).toArray()
            .then((result) => {
                console.log("sending data");
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(result);
            })
            .catch((err) => {
                console.log("Error")
                res.status(500).send({
                    message: err.message || 'Some error occurred while retrieving the user lists.'
                });
            });
    } catch (err) {
        console.log("Error #2")
        res.status(500).json(err);
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        if (!userId) {
            res.status(400).send({ message: 'Invalid user ID supplied.' });
            return;
        }
        // First gets the user's lists
        const userLists = await mongodb.getDb().db('CSE341ToDoListAPI').collection('users').find({ _id: userId }).toArray();

        const dailyToDoId = userLists[0].dailyToDoId;
        const weeklyToDoId = userLists[0].weeklyToDoId;
        const dailyCompleteId = userLists[0].dailyCompleteId;
        const weeklyCompleteId = userLists[0].weeklyCompleteId;

        // dailyToDo
        try {
            const response1 = await mongodb.getDb().db('CSE341ToDoListAPI').collection('dailyToDo').deleteOne({ _id: dailyToDoId }, true);
            if (response1.deletedCount > 0) {
            } else {
                res.status(500).json(response1.error || 'And error occurred while deleting the dailyToDo List.');
            }
        } catch (err) {
            res.status(500).json(response1.error || 'And error occurred while deleting the dailyToDo List.');
        }
        // dailyComplete 
        try {
            const response2 = await mongodb.getDb().db('CSE341ToDoListAPI').collection('dailyComplete').deleteOne({ _id: dailyCompleteId }, true);
            if (response2.deletedCount > 0) {
            } else {
                res.status(500).json(response2.error || 'And error occurred while deleting the dailyComplete List.');
            }
        } catch (err) {
            res.status(500).json(response2.error || 'And error occurred while deleting the dailyComplete List.');
        }
        // weeklyToDo 
        try {
            const response3 = await mongodb.getDb().db('CSE341ToDoListAPI').collection('weeklyToDo').deleteOne({ _id: weeklyToDoId }, true);
            if (response3.deletedCount > 0) {
            } else {
                res.status(500).json(response3.error || 'And error occurred while deleting the dailyComplete List.');
            }
        } catch (err) {
            res.status(500).json(response3.error || 'And error occurred while deleting the dailyComplete List.');
        }
        // weeklyComplete
        try {
            const response4 = await mongodb.getDb().db('CSE341ToDoListAPI').collection('weeklyComplete').deleteOne({ _id: weeklyCompleteId }, true);
            if (response4.deletedCount > 0) {
            } else {
                res.status(500).json(response4.error || 'And error occurred while deleting the weeklyComplete List.');
            }
        } catch (err) {
            res.status(500).json(response4.error || 'And error occurred while deleting the weeklyComplete List.');
        }
        // user
        try {
            const response5 = await mongodb.getDb().db('CSE341ToDoListAPI').collection('users').deleteOne({ _id: userId }, true);
            if (response5.deletedCount > 0) {
                res.status(204).send();
            } else {
                res.status(500).json(response5.error || 'And error occurred while deleting the user.');
            }
        } catch (err) {
            res.status(500).json(response5.error || 'And error occurred while deleting the user.');
        }
    } catch (err) {
        res.status(500).json(err || 'Some error occurred while deleting the user.');
    }
};


module.exports = { getUserLists, deleteUser };
