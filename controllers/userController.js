const User = require("../models/usermodel");
const bcrypt = require("bcrypt");
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
        const userId = await User.findById(id).populate("Trakmama");;
        res.status(200).json(userId);
    } catch(error) {
        res.status(500).json({message: error.message});   
    }
};

const registerUser = async (req, res) => {
    try {
        const { username, password, firstName, lastName } = req.body;

        // Check if the necessary fields are present
        if (!username || !password || !firstName || !lastName || !phone) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Check if user already exists
        const userExist = await User.findOne({ username });
        if (userExist) {
            return res.status(400).json({ message: "User already exists!" });
        }

        // Hash password using bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user object
        const newUser = new User({
            username,
            password: hashedPassword,
            firstName,
            lastName,
            phone,
        });

        // Save new user
        await newUser.save();

        res.status(201).json({ message: "User successfully added", user: newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if username exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send('Username cannot be found');
        }

        // Compare the hashed password from the db
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                status: "success",
                message: "User logged in successfully",
                userFound,
                token: generateToken(user._id),
              });
        } else  {
            return res.status(400).send('invalid login credentials');
        }

        // If credentials are correct, send dashboard or success message
        res.send("your dashboard");
        // res.render('dashboard');
        res.status(200).json({message: "login successful"})
    } catch (error) {
        res.status(500).json({ message: 'An error occurred during login' });
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

        const userExist = await Book.findOne({ _id: id });

        if (!userExist) {
            return res.status(404).json({ message: "User does not exist!"})
        }
        const deleteUser = await Book.findByIdAndDelete(id);

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