// Import express
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require("./config/dbConfig");
const bodyParser = require('body-parser');
const path = require('path');
// Import routes
const trakRouter = require('./routes/trakRoutes');
const userRouter = require('./routes/userRoutes');
const supportRouter = require('./routes/supportGrp');
const swaggerMiddleware = require('./swagger');
//const setupSwagger = require('./swagger');

// Initialize express instance
const app = express();   

const trackerRoutes = require('./routes/pregTrackerRoute');
const libraryRoutes = require('./routes/libraryRoutes');
const calendarEventRoutes = require('./routes/calendarEventRoutes');
const chatRoutes = require('./routes/chatbotRoute')

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

// install view engine
app.set('view engine', 'ejs') 
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));


// Middleware to parse incoming JSON requests
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// import static files
// app.use(express.static('public'));

//require swagger
app.use('/v1/api-docs', swaggerMiddleware.serveMiddleware, swaggerMiddleware.setupMiddleware);
// Use routes
app.use('/v1/api/users', userRouter);
app.use('/v1/api/trakmama', trakRouter);
app.use('/v1/api/support', supportRouter);
app.use('/v1/api/trackers', trackerRoutes);
app.use('/v1/api/library', libraryRoutes);
app.use('/v1/api/calendar-events', calendarEventRoutes);
app.use('/v1/api/chatbot', chatRoutes)



module.exports= app;
