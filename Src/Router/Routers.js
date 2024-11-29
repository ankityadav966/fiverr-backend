const express = require('express');
const loginapi = require('../Controller/common/Login');
const Clientloginapi = require('../Models/Client-validation');
const router = express.Router();
const validate = require("../Middleware/Client-loginpage")


router.post("/login", validate(Clientloginapi, "User Are Login Successfully"), loginapi)




module.exports = router;