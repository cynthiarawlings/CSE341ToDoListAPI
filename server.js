// ***********
// server.js

const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const mongodb = require('./connections/index');
const swaggerUi = require('swagger-ui-express');
const cookieParser = require("cookie-parser");
// const swaggerDocumentInstructions = require('./swagger');
const swaggerDocument = require('./documentation/swagger.json');

app
  .use(bodyParser.json())
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
