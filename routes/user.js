// ***********
// routes/user.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.js');
const loadUser = require("../middleware/loadUser");


router.get('/', userController.getUserUserDailyToDo);
router.use([loadUser]);


module.exports = router;