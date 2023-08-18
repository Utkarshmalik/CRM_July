
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
require('dotenv').config()
const authRoutes = require("./src/Routes/authRoutes");
const userRoutes = require("./src/Routes/userRoutes");
const serverConfigs = require("./src/configs/server.configs");
const { DB_URL } = require("./src/configs/db.configs");
const ticketRoutes = require("./src/Routes/ticketRoutes");
const { sendEmail } = require("./src/utils/Notifications");
const cors = require("cors");

var whitelist = ['http://127.0.0.1:5501', "/\.amazon.com\.com$/"]

var corsOptions = {
  origin: function (origin, callback) {
    console.log(origin);
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
 


const app = express();

app.use(bodyParser.json());
app.use(cors())


mongoose.connect(DB_URL,{useNewUrlParser:true})
.then(()=>{
    console.log("Connected to DB successfully");
})
.catch((err)=>{
    console.log("Couldn't connect to the database", err);
})



authRoutes(app);
userRoutes(app);
ticketRoutes(app);


app.listen(serverConfigs.PORT, ()=>{
    console.log(`Server is up and running on PORT ${serverConfigs.PORT}`);
})