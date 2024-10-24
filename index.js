const express = require('express');
const connectionMongoDB = require('./Src/DB/config'); 

const app = express();

const PORT = 8090;
const DB_name = "fiverr_clone_db";
const URI = `mongodb://localhost:27017/${DB_name}`;



connectionMongoDB(URI).then(() => {

    console.log("MongoDB connected successfully");

}).catch((err) => {
    console.log(err);
})



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

