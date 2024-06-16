const express = require('express');
const User = require("../models/usermodel");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isAdmin = require("../middlewares/isAdmin")
const supportRouter = express.Router();
const {
    getAllUsersInGroup,
    createSupportGroup,
    joinSupportGroup,
    postInSupportGroup,
    removeMemberFromGroup,
    deleteGroupById
} = require("../controllers/supportGrpCtrl");


supportRouter.get('/members', isLoggedIn, getAllUsersInGroup);
supportRouter.post('/create', isLoggedIn, createSupportGroup);
supportRouter.post('/:groupId/users/:id/join', isLoggedIn, joinSupportGroup);
supportRouter.post('/:groupId/users/:id/post', isLoggedIn, postInSupportGroup);
supportRouter.delete('/:groupId/users/:id/remove', isLoggedIn, isAdmin, removeMemberFromGroup);
supportRouter.delete('/:groupId/delete', isLoggedIn, isAdmin, deleteGroupById)


module.exports = supportRouter; 
