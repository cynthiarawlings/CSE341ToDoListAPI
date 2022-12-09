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

// ************
// This is not active yet

// DELETE
const deleteUser = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        if (!userId) {
            res.status(400).send({ message: 'Invalid user ID supplied.' });
            return;
        }
        // First gets the user's lists
        const userLists = await mongodb.getDb().db('CSE341ToDoListAPI').collection('users').find({ _id: userId }).toArray();
        const dailyToDoId = userLists.dailyToDoId;
        const weeklyToDoId = userLists.weeklyToDoId;
        const dailyCompleteId = userLists.dailyCompleteId;
        const weeklyCompleteId = userLists.weeklyCompleteId;


        // Deletes the User from the users database
        const response = await mongodb.getDb().db('CSE341ToDoListAPI').collection('users').deleteOne({ _id: userId }, true);
        if (response.deletedCount > 0) {
            // res.status(204).send();
            // dailyToDo
            try {
                const response = await mongodb.getDb().db('CSE341ToDoListAPI').collection('dailyToDo').deleteOne({ _id: dailyToDoId }, true);
                if (response.deletedCount > 0) {
                    // res.status(204).send();
                    // dailyComplete 
                    try {
                        const response = await mongodb.getDb().db('CSE341ToDoListAPI').collection('dailyComplete').deleteOne({ _id: dailyCompleteId }, true);
                        if (response.deletedCount > 0) {
                            // res.status(204).send();
                            // weeklyToDo 
                            try {
                                const response = await mongodb.getDb().db('CSE341ToDoListAPI').collection('weeklyToDo').deleteOne({ _id: weeklyToDoId }, true);
                                if (response.deletedCount > 0) {
                                    // res.status(204).send();
                                    // weeklyComplete
                                    try {
                                        const response = await mongodb.getDb().db('CSE341ToDoListAPI').collection('weeklyComplete').deleteOne({ _id: weeklyCompleteId }, true);
                                        if (response.deletedCount > 0) {
                                            res.status(204).send();
                                        } else {
                                            res.status(500).json(response.error || 'And error occurred. Try again later!');
                                        }
                                    } catch (err) {
                                        res.status(500).json(err);
                                    }
                                } else {
                                    res.status(500).json(response.error || 'And error occurred. Try again later!');
                                }
                            } catch (err) {
                                res.status(500).json(err);
                            }
                        } else {
                            res.status(500).json(response.error || 'And error occurred. Try again later!');
                        }
                    } catch (err) {
                        res.status(500).json(err);
                    }
                } else {
                    res.status(500).json(response.error || 'And error occurred. Try again later!');
                }
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the user.');
        }
    } catch (err) {
        res.status(500).json(err || 'Some error occurred while deleting the user.');
    }
};


module.exports = { getUserLists, deleteUser };
