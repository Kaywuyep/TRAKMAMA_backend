const express = require("express");
// const User = require("../models/usermodel");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isAdmin = require("../middlewares/isAdmin")
const calendarRouter = express.Router();
const {
    createCalendarEvent,
    getCalendarEvents,
    getCalendarEvent,
    updateCalendarEvent,
    deleteCalendarEvent
} = require('../controllers/calendarEventController');

calendarRouter.post('/', isLoggedIn, createCalendarEvent);
calendarRouter.get('/:userId', isLoggedIn, getCalendarEvents);
calendarRouter.get('/:eventId', isLoggedIn, getCalendarEvent);
calendarRouter.put('/:eventId/update', isLoggedIn, updateCalendarEvent);
calendarRouter.delete('/:eventId/delete', isLoggedIn, deleteCalendarEvent);

module.exports = calendarRouter;