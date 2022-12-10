// ***********
// routes/dailyToDo.js

const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const validatior = require('../validation/validation.js');
const dailyToDoValidator = validatior.dailyToDoValidation
const dailyToDoController = require('../controllers/dailyToDo.js');


router.get('/:id', dailyToDoController.getDailyToDListById);

router.put('/:id', dailyToDoValidator,
    function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).jsonp(errors.array());
        } else {
            dailyToDoController.updateTasksDailyToDo(req, res);
        }
    });


module.exports = router;
