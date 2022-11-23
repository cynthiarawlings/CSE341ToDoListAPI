// ***********
// routes/dailyToDo.js

const express = require('express');
const router = express.Router();
// const { validationResult } = require('express-validator');
const dailyToDoController = require('../controllers/dailyToDo.js');
// const validatior = require('../validation.js');
// const characterValidator = validatior.characterValidation;

router.get('/:id', dailyToDoController.getDailyToDListById);

// No validation yet
// router.post('/', dailyToDoController.createDailyToDList);

// *****
// Note, there is no get all because each user will supply an id to get thier list.
// I still need to do post, put, and delete

module.exports = router;