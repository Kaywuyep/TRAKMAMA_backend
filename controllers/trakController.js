const User = require('../models/usermodel');
const Trakmama= require('../models/trakModel');

const getPregnancyTracking = async (req, res) => {
    try {
        const pTrak = await Trakmama.find();

        if (!pTrak) {
            return res.status(400).json({ message: `${Trakmama} not found!!`})
        }
        res.status(200).json(pTrak)

    } catch(error){
        res.status(500).json({message: error.message})
    }
};
const getPregnancyTrackingById = async (req, res) => {
    try {
        const id = req.params.id
        const TrackingExist = await Trakmama.findOne({_id: id});
        if (!TrackingExist) {
            return res.status(400).json({ message: "Tracking data does not Exist!!"})
        }
        const trackingId = await Trakmama.findById(id);
        res.status(200).json(trackingId);
    } catch(error) {
        res.status(500).json({message: error.message});   
    }
};

// a function to create a new pregnancy tracking document
const createPregnancyTracking = async (req, res) => {
    try {
        const id = req.params.id;
        
        //Find the user
        //const user = await User.findOne({ _id: id });
        const user = await User.findById({ _id: id});
    
        if (!user) {
            res.status(404).json("user not found");
        }

        // Extract fields from request body
        const { dueDate, lastMenstrualPeriod, currentWeek, weightGain, symptoms, appointments } = req.body;

        // Validate required fields
        if (!dueDate || !lastMenstrualPeriod || currentWeek === undefined || weightGain === undefined || !symptoms) {
            return res.status(400).json({ message: "Missing required fields" });
        }
    
        const newTraking = await Trakmama.create({
            username: user._id,
            dueDate,
            lastMenstrualPeriod,
            currentWeek,
            weightGain,
            symptoms: Array.isArray(symptoms) ? symptoms : symptoms.split(',').map(s => s.trim()),
            appointments
        });

        // Add the new tracking entry to the user's pregnancyTracking array
        user.pregnancyTracking.push(newTraking._id);
        await user.save();
        // Save new user
        // await newTraking.save();
        console.log(newTraking);

    res.status(201).json({ message: "Pregnancy tracking successfully added", traking: newTraking });
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
};

const updatePregnancyTracking = async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;

        // Validate the tracking ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid tracking ID' });
        }


        // Find and update the pregnancy tracking document
        const updatedTracking = await PregnancyTracking.findByIdAndUpdate(
            {_id: id},
            updates,
            {
                new: true, // Return the updated document
                runValidators: true // Ensure the updates adhere to the schema validation
                });

        // If the tracking document doesn't exist
        if (!updatedTracking) {
            return res.status(404).json({ message: 'Pregnancy tracking record not found' });
        }

        // Respond with the updated document
        res.status(200).json({
            success: true,
            message: "Tracking updated",
            updatedTracking,
          });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createPregnancyTracking,
    getPregnancyTracking,
    getPregnancyTrackingById,
    updatePregnancyTracking
};