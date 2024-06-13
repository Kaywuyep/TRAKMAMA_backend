const express = require("express");
const connectDB = require("./config/dbConfig")

app = express();

connectDB();

PORT = process.env.PORT || 3000;
url = `http://127.0.0.1:${PORT}`;


app.listen(PORT, () => {
    console.log(`server runing on ${url}`)
});