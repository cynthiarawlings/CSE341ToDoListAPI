// ***********
// server.js

const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const mongodb = require('./connections/index');
const swaggerUi = require('swagger-ui-express');
//const cors = require('cors');
const cookieParser = require("cookie-parser");
// const swaggerDocumentInstructions = require('./swagger');
const swaggerDocument = require('./documentation/swagger-example.json');
// const { auth, requiresAuth } = require('express-openid-connect');

app
    //.use(cors())
    .use(bodyParser.json())
    //.use(express.urlencoded({ extended: true }))
    .use(cookieParser())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    // .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocumentInstructions))
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use('/', require('./routes'));

// Connect to Mongodb
mongodb.initDb((err, mongodb) => {
  if (err) {
    err.statusCode = err.statusCode || 500;
    console.log('Cannot connect to the database!', err);
    process.exit();
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});

//Auth Autentification
// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   // secret: process.env.SECRET,
//   secret: process.env.CLIENT_SECRET,
//   baseURL: process.env.BASE_URL,
//   clientID: process.env.CLIENT_ID,
//   // issuerBaseURL: process.env.ISSUER_BASE_URL,
//   issuerBaseURL: process.env.AUTHORIZATION_HOST
// };
// auth router attaches /login, /logout, and /callback routes to the baseURL
// app.use(auth(config));

// req.isAuthenticated is provided from the auth router
// app.get('/', (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });

// app.get('/user', requiresAuth(), (req, res) => {
//   res.send(JSON.stringify(req.oidc.user));
// });
