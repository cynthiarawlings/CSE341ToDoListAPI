// ***********
// routes/authorization.js

const express = require("express");
const router = express.Router();
const AuthorizationController = require("../controllers/authorization.js");


router.get("/login", AuthorizationController.login);
router.get("/callback", AuthorizationController.callback);


module.exports = router;