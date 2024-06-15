const express = require('express');
const User = require("../models/usermodel");
const isLoggedIn = require("../middlewares/isLoggedIn");
const supportRouter = express.Router();
const {
    createSupportGroup,
    joinSupportGroup,
    postInSupportGroup
} = require("../controllers/supportGrpCtrl");


supportRouter.post('/create', isLoggedIn, createSupportGroup);
supportRouter.post('/:groupId/join', isLoggedIn, joinSupportGroup);
supportRouter.post('/:groupId/post', isLoggedIn, postInSupportGroup);

module.exports = supportRouter; 
