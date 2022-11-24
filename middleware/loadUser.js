// ***********
// middleware/loadUser.js

const mongodb = require('../connections/index');
const authorizationHost = process.env.AUTHORIZATION_HOST;
const authUserURL = authorizationHost + "/userinfo";
// const dailyToDoController = require('../controllers/dailyToDo.js');


const loadUser = async (req, res, next) => {
    const authZeroUser = await fetchAuthZeroUser(req.headers.authorization);
    const user = await findOrCreateUser(authZeroUser);

    req.user = user;

    next();
};

const fetchAuthZeroUser = async (authorizationValue) => {
    const response = await fetch(authUserURL, {
        headers: { Authorization: authorizationValue }
    });
    return response.json();
};

const findOrCreateUser = async (authZeroUserJson) => {
    if (!authZeroUserJson) return;
    const exitingUser = await mongodb.getDb().db('CSE341ToDoListAPI').collection('users').find({ identifier: authZeroUserJson.sub }).toArray();

    if (exitingUser.length > 0) {
        return exitingUser[0];
    }


    // This is the default list. For authentication purposes the auth0 identifier is stored here
    const dailyToDoId = await mongodb.getDb().db('CSE341ToDoListAPI').collection('dailyToDo').insertOne({
        identifier: authZeroUserJson.sub
    });


    const newUser = await mongodb.getDb().db('CSE341ToDoListAPI').collection('users').insertOne({
        identifier: authZeroUserJson.sub,
        dailyToDoId: dailyToDoId.insertedId
        // This creates an empty document for dailyToDo and adds the id to the users database
    });

    return newUser;
}


module.exports = loadUser;
