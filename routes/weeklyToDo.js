// ***********
// routes/weeklyToDo.js

const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const validatior = require('../validation/validation.js');
const weeklyToDoValidator = validatior.weeklyToDoValidation
const weeklyToDoController = require('../controllers/weeklyToDo.js');


router.get('/:id', weeklyToDoController.getWeeklyToDListById);

router.put('/:id', weeklyToDoValidator,
    function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).jsonp(errors.array());
        } else {
            weeklyToDoController.updateTasksWeeklyToDo(req, res);
        }
    });


module.exports = router;
