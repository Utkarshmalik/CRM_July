
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
require('dotenv').config()
const authRoutes = require("./src/Routes/authRoutes");
const userRoutes = require("./src/Routes/userRoutes");
const serverConfigs = require("./src/configs/server.configs");
const { DB_URL } = require("./src/configs/db.configs");

const app = express();

app.use(bodyParser.json());




mongoose.connect(DB_URL,{useNewUrlParser:true})
.then(()=>{
    console.log("Connected to DB successfully");
})
.catch((err)=>{
    console.log("Couldn't connect to the database", err);
})


authRoutes(app);
userRoutes(app);


app.listen(serverConfigs.PORT, ()=>{
    console.log(`Server is up and running on PORT ${serverConfigs.PORT}`);
})