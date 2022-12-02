// ***********
// routes/index.js

const express = require('express');
const router = express.Router();
const authorizationRoutes = require("./authorization");


router.use('/api/dailyToDo', require('./dailyToDo'));
router.use('/api/weeklyToDo', require('./weeklyToDo'));
router.use("/authorization", authorizationRoutes);
router.use("/user", require('./user'));

router.get("/logout", (req, res) => {
    return res
        .clearCookie("access_token")
        .status(200)
        .json({ message: "Successfully logged out." });
});


module.exports = router;
