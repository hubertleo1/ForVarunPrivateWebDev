const express = require("express");
const router = express.Router();
var fs = require("fs");
const User = require('../models/user-model');

const AuthService = require('../services/auth-service')

router.post("/login", (req, res) => {
    //assume that req has req.email and req.body
    //get users
    //loop through users find user by email. if none, then reject
    //if password. if user == password, then return success, if not
    //then return password incorrect!
    //Just call the service!
    AuthService.prototype.login(req.body)
    .then(user => {
        res.send(user)
    })
    .catch(err => {
        res.status(400).send(err);
    });
})
router.use("/register", (req, res) => {
    //This simply uses the model!
    //Assume req.body has a new user for us
    User.prototype.createUserJSON(req.body).then(users => {
        res.send(users);
    }).catch(err => {
        res.status(400).send(err);
    });
})
module.exports = router;
