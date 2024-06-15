// Import express
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require("./config/dbConfig");
const bodyParser = require('body-parser');
// Import routes
const trakRouter = require('./routes/trakRoutes');
const userRouter = require('./routes/userRoutes');
const supportRouter = require('./routes/supportGrp');

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

// Initialize express instance
const app = express();   



// Middleware to parse incoming JSON requests
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use('/v1/api/users', userRouter);
app.use('/v1/api/trakmama', trakRouter);
app.use('/v1/api/support', supportRouter);

module.exports = app;