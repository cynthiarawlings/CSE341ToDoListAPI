// ***********
// controller/user.js


const mongodb = require('../connections/index');


// Get User by ID
const getUserUserLists = async (req, res) => {
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
                    message: err.message || 'Some error occurred while retrieving your To Do Lists.'
                });
            });
    } catch (err) {
        res.status(500).json(err);
    }
};


module.exports = { getUserUserLists };
