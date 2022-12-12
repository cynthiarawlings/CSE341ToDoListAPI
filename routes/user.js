// ***********
// routes/user.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.js');
// const loadUser = require("../middleware/loadUser");


router.get('/:id', userController.getUserLists);

router.delete('/:id', userController.deleteUser);
// router.use([loadUser]);

module.exports = router;
