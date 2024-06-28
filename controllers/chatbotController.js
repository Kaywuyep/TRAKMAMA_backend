const path = require('path');

//const getChatbotPage = (req, res) => {
  // res.sendFile(path.join(__dirname, '../public', 'index.ejs'));
//};
const getChatbotPage = (req, res) => {
  res.render('chatbot');
};


module.exports = {
  getChatbotPage,
};