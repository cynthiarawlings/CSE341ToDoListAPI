// ***********
// middleware/loadUser.js

const mongodb = require('../connections/index');
const authorizationHost = process.env.AUTHORIZATION_HOST;
const authUserURL = authorizationHost + "/userinfo";


const loadUser = async (req, res, next) => {
    const authZeroUser = await fetchAuthZeroUser(req.headers.authorization);
    const user = await findOrCreateUser(authZeroUser);

    req.user = user;

    next();
};

const fetchAuthZeroUser = async (authorizationValue) => {
    const response = await fetch(authUserURL, {
        headers: { Authorization: authorizationValue}
    });
    return response.json();
};

const findOrCreateUser = async (authZeroUserJson) => {
    if (!authZeroUserJson) return;
    const exitingUser = await mongodb.getDb().db('CSE341ToDoListAPI').collection('users').find({ identifier: authZeroUserJson.sub }).toArray();

    if (exitingUser.length > 0) {
        return exitingUser[0];
    }

    const newUser = await mongodb.getDb().db('CSE341ToDoListAPI').collection('users').insertOne({
        identifier: authZeroUserJson.sub,
        email: authZeroUserJson.email,
        givenName: authZeroUserJson.given_name,
        familyName: authZeroUserJson.family_name,
        locale: authZeroUserJson.locale,
        picture: authZeroUserJson.picture
    });

    return newUser;
}


module.exports = loadUser;
