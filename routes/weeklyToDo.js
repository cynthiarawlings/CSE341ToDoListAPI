// ***********
// routes/weeklyToDo.js

const express = require('express');
const router = express.Router();
const weeklyToDoController = require('../controllers/weeklyToDo.js');


router.get('/:id', weeklyToDoController.getWeeklyToDListById);
router.put('/:id', weeklyToDoController.updateTasksWeeklyToDo);


module.exports = router;
