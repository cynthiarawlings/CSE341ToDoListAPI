// ***********
// routes/user.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.js');
const loadUser = require("../middleware/loadUser");
const { auth, requiresAuth } = require('express-openid-connect');

// app.get('/user', requiresAuth(), (req, res) => {
//     res.send(JSON.stringify(req.oidc.user));
//   });

router.get('/:id', requiresAuth(), (req, res) => {
    // res.send(userController.getUserLists);
    userController.getUserLists(req, res);
});
  
// router.get('/:id', userController.getUserLists);

router.delete('/:id', userController.deleteUser);
router.use([loadUser]);

module.exports = router;
