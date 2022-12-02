// ***********
// routes/dailyToDo.js

const express = require('express');
const router = express.Router();
const dailyToDoController = require('../controllers/dailyToDo.js');


router.get('/:id', dailyToDoController.getDailyToDListById);
router.put('/:id', dailyToDoController.updateTasksDailyToDo);


module.exports = router;
