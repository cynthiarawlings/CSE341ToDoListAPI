// ***********
// controller/user.js


const mongodb = require('../connections/index');


// Get User by ID
const getUserLists = async (req, res) => {
    try {
        if (!authZeroUserJson.sub) {
            res.status(400).send({ message: 'No 0auth id supplied.' });
            return;
        }
        await mongodb.getDb().db('CSE341ToDoListAPI').collection('users').find({ identifier: authZeroUserJson.sub })
            .then((result) => {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(result);
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || 'Some error occurred while retrieving your information.'
                    // message: err.message || 'Some error occurred while retrieving your To Do Lists.'
                });
            });
    } catch (err) {
        res.status(500).json(err);
    }
};

// Add List Id to the Matching User (PUT)
const addDailyToDoListToUser = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        if (!userId) {
            res.status(400).send({ message: 'Invalid user ID supplied.' });
            return;
        }
        const updatedUser = {
            identifier: req.body.sub,
            email: req.body.email,
            givenName: req.body.given_name,
            familyName: req.body.family_name,
            locale: req.body.locale,
            picture: req.body.picture,
            dailyToDoList: req.body.dailyToDoListId
        };
        const response = await mongodb.getDb().db('CSE341ToDoListAPI').collection('users').replaceOne({ _id: userId }, updatedUser);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the user with the new list.');
        }
    } catch (err) {
        res.status(500).json(err);
    }
}


module.exports = { getUserLists, addDailyToDoListToUser };
