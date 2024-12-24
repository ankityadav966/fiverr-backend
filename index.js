const express = require('express');
const connectionMongoDB = require('./Src/DB/config');
// const Routers = require('./Src/Router/Routers');
const router = require('./Src/Router/Routers');
const app = express();
const PORT = 8090;
app.use(express.json())
app.use(router)
const ratelimit = require('express-rate-limit');

const DB_name = "fiverr_clone_db";
const URI = `mongodb://localhost:27017/${DB_name}`;
connectionMongoDB(URI).then(() => {
    console.log("MongoDB connected successfully");

}).catch((err) => {
    console.log(err);
})


const limiter = ratelimit({
    windowMs: 60 * 1000,
    max: 100,
    message: "Too many Request from this IP, Please try again later "
})
// app.use(express.static("public"));
// app.use(express.static(path.join(__dirname,"public")));


app.use(limiter)








app.listen(PORT, () => {
    console.log(`Server is running on ports ${PORT}`);
})

