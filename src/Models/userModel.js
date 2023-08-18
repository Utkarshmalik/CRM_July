const mongoose = require("mongoose");
const validator = require("validator");
const { userTypes, userStatus } = require("../utils/constants");

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
        },
        index:true
    },
    password:{
        type:String,
        required:true
    },
    userType:{
        type:String,
        required:true,
        enum: Object.values(userTypes),
        default:userTypes.customer,
        index:true
    },
    userStatus:{
        type:String,
        required:true,
        default:userStatus.pending,
        enum:Object.values(userStatus)
    }
},{timestamps:true});


module.exports =  mongoose.model("User", userSchema);