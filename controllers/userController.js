const User = require("../models/usermodel");
const bcrypt = require("bcrypt");
//const bcrypt = require("bcrypt");
const generateToken = require("../utils/generatetoken");


const getUsers = async (req, res) => {
    try {
        const users = await User.find();

        if (!users) {
            return res.status(400).json({ message: `${User} not found!!`})
        }
        res.status(200).json(users)

    } catch(error){
        res.status(500).json({message: error.message})
    }
};
const getUserProfile = async (req, res) => {
    try {
        const id = req.params.id
        const userExist = await User.findOne({_id: id});
        if (!userExist) {
            return res.status(400).json({ message: "User does not Exist!!"})
        }
        const userId = await User.findById(id).populate('pregnancyTracking');
        res.status(200).json(userId);
    } catch(error) {
        res.status(500).json({message: error.message});   
    }
};

const registerUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // Check if the necessary fields are present
        if (!username || !password || !email) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Check if user already exists
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User already exists!" });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        req.body.password = hashedPassword;
        const userdata = await User.insertMany(req.body);
        console.log(userdata);

        // Create new user object
        const newUser = new User({
            username,
            password: hashedPassword,
            email,
        });

        // Save new user
        //await newUser.save();

        res.status(201).json({ message: "User successfully added", user: newUser });
    } catch (error) {
        console.log("error registering new user:", error.message)
        res.status(500).json({ message: error.message });
    }
};
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if username exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'email cannot be found' });
        }

        // Log retrieved user information for debugging
        console.log("Retrieved User:", user);

        // Ensure password is provided
        if (!password) {
            console.log("Password not provided");
            return res.status(400).json({ message: 'Password not provided' });
        }

        // Compare the hashed password from the db
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        
        // Log password comparison results for debugging
        console.log("Password Match Result:", isPasswordMatch);

        if (isPasswordMatch) {
            res.json({
                status: "success",
                message: "User logged in successfully",
                user,
                token: generateToken(user._id),
            });
        } else {
            console.log("Password mismatch");
            return res.status(400).json({ message: 'Password mismatch' });
        }
    } catch (error) {
        console.error('An error occurred during login:', error.message);
        res.status(500).json({ message: error.message });
    }
};

const updateById = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findOne({ _id: id });
        if (!userExist) {
            return res.status(400).json({ message: "User does not exists!!" });
        }
        const updateUser = await User.findByIdAndUpdate(id, req.body, {new: true});

        res.status(200).json({ message: `${updateUser}User profile updated successfully!!`})
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteUsers = async (req, res) => {
    try {
        const id = req.params.id;

        const userExist = await User.findOne({ _id: id });

        if (!userExist) {
            return res.status(404).json({ message: "User does not exist!"})
        }
        const deleteUser = await User.findByIdAndDelete(id);

        if (!deleteUser) {
            return res.status(404).json({ error: "User not found!"})
        }
        res.status(200).json({ message: "User successfully deleted!"});
    } catch(error) {
        res.status(500).json({error: error.message})
    }
};

module.exports = {
    getUsers,
    getUserProfile,
    registerUser,
    loginUser,
    updateById,
    deleteUsers
};