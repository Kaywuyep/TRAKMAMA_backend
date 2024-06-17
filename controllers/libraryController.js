const Library = require('../models/library');

// Create a new library entry
const createLibrary = async (req, res) => {
    try {
        const library = new Library(req.body);
        await library.save();
        res.status(201).json(library);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all library entries
const getLibraries = async (req, res) => {
    try {
        const libraries = await Library.find();
        res.status(200).json(libraries);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a single library entry by ID
const getLibrary = async (req, res) => {
    try {
        const library = await Library.findById(req.params.libraryId);
        if (!library) {
            return res.status(404).json({ error: 'Library not found' });
        }
        res.status(200).json(library);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a library entry by ID
const updateLibrary = async (req, res) => {
    try {
        const library = await Library.findByIdAndUpdate(req.params.libraryId, req.body, { new: true, runValidators: true });
        if (!library) {
            return res.status(404).json({ error: 'Library not found' });
        }
        res.status(200).json(library);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a library entry by ID
const deleteLibrary = async (req, res) => {
    try {
        const library = await Library.findByIdAndDelete(req.params.libraryId);
        if (!library) {
            return res.status(404).json({ error: 'Library not found' });
        }
        res.status(200).json({ message: 'Library deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createLibrary,
    getLibraries,
    getLibrary,
    updateLibrary,
    deleteLibrary 
};