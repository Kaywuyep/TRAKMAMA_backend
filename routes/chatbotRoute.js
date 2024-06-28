const express = require('express');
const chatRouter = express.Router();
const { getChatbotPage } = require('../controllers/chatbotController');
//const isLoggedIn = require('../middlewares/isLoggedIn');

// Define the route to serve the chatbot page
//chatRouter.get('/', isLoggedIn, getChatbotPage);
chatRouter.get('/', getChatbotPage);

module.exports = chatRouter;
