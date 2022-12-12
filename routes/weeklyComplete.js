// ***********
// routes/dailyComplete.js

const express = require('express');
const router = express.Router();
const weeklyCompleteController = require('../controllers/dailyComplete');


//router.get('/:id', weeklyCompleteController.getWeeklyCompleteById);
router.put('/:id', weeklyCompleteController.addTaskWeeklyComplete);
router.delete('/:id', weeklyCompleteController.removeTaskWeeklyComplete);

module.exports = router;