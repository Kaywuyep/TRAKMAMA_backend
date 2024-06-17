const Tracker = require('../models/pregnancyTracker');

// Create a new tracker entry
const createTracker = async (req, res) => {
    try {
        const tracker = new Tracker(req.body);
        await tracker.save();
        console.log(tracker);
        res.status(201).json(tracker);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all tracker entries for a user
const getTrackers = async (req, res) => {
    try {
        const trackers = await Tracker.find({ username: req.params.userId });
        res.status(200).json(trackers);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a single tracker entry by ID
const getTracker = async (req, res) => {
    try {
        const tracker = await Tracker.findById(req.params.trackerId);
        if (!tracker) {
            return res.status(404).json({ error: 'Preganancy tracker not found' });
        }
        res.status(200).json(tracker);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a tracker entry by ID
const updateTracker = async (req, res) => {
    try {
        const tracker = await Tracker.findByIdAndUpdate(
            req.params.trackerId,
            req.body,
            {
                new: true,
                runValidators: true
            });
        if (!tracker) {
            return res.status(404).json({ error: 'Tracker not found' });
        }
        res.status(200).json(tracker);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a tracker entry by ID
const deleteTracker = async (req, res) => {
    try {
        const tracker = await Tracker.findByIdAndDelete(req.params.trackerId);
        if (!tracker) {
            return res.status(404).json({ error: 'Tracker not found' });
        }
        res.status(200).json({ message: 'Tracker deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createTracker,
    getTrackers,
    getTracker,
    updateTracker,
    deleteTracker
};