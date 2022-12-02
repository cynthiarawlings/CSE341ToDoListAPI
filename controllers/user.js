// ***********
// controller/user.js


const mongodb = require('../connections/index');


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
                    message: err.message || 'Some error occurred while retrieving the user lists.'
                });
            });
    } catch (err) {
        res.status(500).json(err);
    }
};

// ************
// This is not active yet

// DELETE
// const deleteUser = async (req, res) => {
//     try {
//         const userId = new ObjectId(req.params.id);
//         if (!userId) {
//             res.status(400).send({ message: 'Invalid user ID supplied.' });
//             return;
//         }
//         // Deletes the User from the users database
//         const response = await mongodb.getDb().db('CSE341ToDoListAPI').collection('users').deleteOne({ _id: userId }, true);
//         if (response.deletedCount > 0) {
//             res.status(204).send();
//             // Deletes the Daily Complete from the dailyToDo database
//             try {
//                 const listId = new ObjectId(req.params.id);
//                 const response = await mongodb.getDb().db('CSE341ToDoListAPI').collection('dailyComplete').deleteOne({ _id: listId }, true);
//                 if (response.deletedCount > 0) {
//                     res.status(204).send();
//                   } else {
//                     res.status(500).json(response.error || 'And error occurred. Try again later!');
//                   }
//                 } catch (err) {
//                   res.status(500).json(err);
//                 }
//             try {
//                 const listId = new ObjectId(req.params.id);
//                 const response = await mongodb.getDb().db('CSE341ToDoListAPI').collection('dailyToDo').deleteOne({ _id: listId }, true);
//                 if (response.deletedCount > 0) {
//                     res.status(204).send();
//                   } else {
//                     res.status(500).json(response.error || 'And error occurred. Try again later!');
//                   }
//                 } catch (err) {
//                   res.status(500).json(err);
//                 }
//         } else {
//             res.status(500).json(response.error || 'Some error occurred while deleting the user.');
//         }
//     } catch (err) {
//         res.status(500).json(err || 'Some error occurred while deleting the user.');
//     }
// };


module.exports = { getUserLists };
