// Import express
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require("./config/dbConfig");
const bodyParser = require('body-parser');
// Import routes
const trakRouter = require('./routes/trakRoutes');
const userRouter = require('./routes/userRoutes');
const supportRouter = require('./routes/supportGrp');
<<<<<<< HEAD
const swaggerMiddleware = require('./swagger');


// Initialize express instance
const app = express();   

=======
const trackerRoutes = require('./routes/pregTrackerRoute');
const libraryRoutes = require('./routes/libraryRoutes');
const calendarEventRoutes = require('./routes/calendarEventRoutes');
>>>>>>> 5116c5de7925a5d1a927a21605a3817de2affe1d

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

//require swagger
app.use('/v1/api-docs', swaggerMiddleware.serveMiddleware, swaggerMiddleware.setupMiddleware);


// Middleware to parse incoming JSON requests
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use('/v1/api/users', userRouter);
app.use('/v1/api/trakmama', trakRouter);
app.use('/v1/api/support', supportRouter);
app.use('/v1/api/trackers', trackerRoutes);
app.use('/v1/api/library', libraryRoutes);
app.use('/v1/api/calendar-events', calendarEventRoutes);







module.exports= app;
