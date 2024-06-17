const CalendarEvent = require('../models/calender');

// Create a new calendar event
const createCalendarEvent = async (req, res) => {
    try {
        const event = new CalendarEvent(req.body);
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all calendar events for a user
const getCalendarEvents = async (req, res) => {
    try {
        const events = await CalendarEvent.find({ user: req.params.userId });
        res.status(200).json(events);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a single calendar event by ID
const getCalendarEvent = async (req, res) => {
    try {
        const event = await CalendarEvent.findById(req.params.eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a calendar event by ID
const updateCalendarEvent = async (req, res) => {
    try {
        const event = await CalendarEvent.findByIdAndUpdate(req.params.eventId, req.body, { new: true, runValidators: true });
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a calendar event by ID
const deleteCalendarEvent = async (req, res) => {
    try {
        const event = await CalendarEvent.findByIdAndDelete(req.params.eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createCalendarEvent,
    getCalendarEvents,
    getCalendarEvent,
    updateCalendarEvent,
    deleteCalendarEvent
};