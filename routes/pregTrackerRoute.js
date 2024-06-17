const express = require("express");
// const User = require("../models/usermodel");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isAdmin = require("../middlewares/isAdmin")
const trakerRouter = express.Router();
const  {
    createTracker,
    getTrackers,
    getTracker,
    updateTracker,
    deleteTracker
} = require('../controllers/pregTrackerCtrl');


trakerRouter.post('/', isLoggedIn, createTracker);
trakerRouter.get('/:userId', isLoggedIn, getTrackers);
trakerRouter.get('/:trackerId', isAdmin, getTracker);
trakerRouter.put('/:trackerId/update', isLoggedIn, updateTracker);
trakerRouter.delete('/:trackerId/delete', isLoggedIn, isAdmin, deleteTracker);

module.exports = trakerRouter;