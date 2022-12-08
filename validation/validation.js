const { check } = require('express-validator');

exports.dailyToDoValidation = [
    check('task0', 'First object should be task0 or remove0').trim().escape(),
    check('remove0', 'First object should be task0 or remove0. Remove0 should contain the name of a task ex. task0').not().trim().escape()
]


exports.weeklyToDoValidation = [
    check('task0', 'First object should be task0 or remove0').trim().escape(),
    check('remove0', 'First object should be task0 or remove0. Remove0 should contain the name of a task ex. task0').not().trim().escape()
]
