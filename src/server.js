
const express = require("express");
const mongoose = require("mongoose");
const validator = require("validator");
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");

const app = express();

app.use(bodyParser.json());


//DB URL you want to attach 

const dbURL = "mongodb+srv://utmalik:qwerty123@cluster0.mzc2yil.mongodb.net/?retryWrites=true&w=majority";


mongoose.connect(dbURL,{useNewUrlParser:true})
.then(()=>{
    console.log("Connected to DB successfully");
})
.catch((err)=>{
    console.log("Couldn't connect to the database", err);
})


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        minLength:3,
        maxLength:7
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        validate:{
            validator:validator.isEmail
        }
    },
    password:{
        type:String,
        required:true
    },
    userType:{
        type:String,
        required:true,
        enum:["CUSTOMER", "ENGINEER", "ADMIN"],
        default:"CUSTOMER"
    },
    userStatus:{
        type:String,
        required:true,
        default:"PENDING",
        enum:["PENDING", "APPROVED", "REJECTED"]
    }
},{timestamps:true});


const userModal = mongoose.model("User", userSchema);


//write an API to insert a new user into the database 


app.post("/crm/api/v1/auth/signup", (req,res)=>{

    const {name, userId, email, password, userType} = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = {
        name,
        userId,
        email,
        password:hashedPassword,
        userType,
        userStatus:(userType==="CUSTOMER")?"APPROVED":"PENDING"
    }

    const newUser = new userModal(user);

    newUser.save().then(data=>{
        console.log(data);
    res.status(201).send({message:"User Created successfully!"});
    })
    .catch(err=>{

        if(err.code===11000){
            return res.status(400).send({message:"UserId/Email already exists in the database"});
        }

        return res.status(500).send({message:err.message})
    })
})


app.get("/crm/api/v1/users",async (req,res)=>{
    try{
    const users = await userModal.find({});
    return res.send(users);

    }
    catch(err){
        return res.status(500).send({message:err.message})
    }
})




app.listen(3000, ()=>{
    console.log("Server is up and running on PORT 3000");
})