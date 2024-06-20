const express = require("express");
// const User = require("../models/usermodel");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isAdmin = require("../middlewares/isAdmin")
const libraryRouter = express.Router();
const  {
    createLibrary,
    getLibraries,
    getLibrary,
    updateLibrary,
    deleteLibrary 
} = require('../controllers/libraryController');

libraryRouter.post('/', isAdmin, createLibrary);
libraryRouter.get('/allLibraries', isLoggedIn, isAdmin, getLibraries);
libraryRouter.get('/:libraryId', isLoggedIn, isAdmin, getLibrary);
libraryRouter.put('/:libraryId/update', isAdmin, updateLibrary);
libraryRouter.delete('/:libraryId/delete', isAdmin, deleteLibrary);

module.exports = libraryRouter;