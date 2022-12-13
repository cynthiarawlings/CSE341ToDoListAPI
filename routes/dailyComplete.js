// ***********
// routes/dailyComplete.js

const express = require('express');
const router = express.Router();
const dailyCompleteController = require('../controllers/dailyComplete.js');


router.get('/:id', dailyCompleteController.getDailyCompleteById);
router.put('/:id', dailyCompleteController.addTaskDailyComplete);
router.delete('/:id', dailyCompleteController.removeTaskDailyComplete);

module.exports = router;
