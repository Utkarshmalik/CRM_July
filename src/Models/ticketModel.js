const { default: mongoose } = require("mongoose");
const { ticketStatus } = require("../utils/constants");

const ticketSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minLength:5,
    },
    description:{
          type:String,
        required:true,
        minLength:10,
    },
    ticketPriority:{
        type:Number,
        min:[1,"Ticket Priority is less than 1"],
        max:[5, "Ticket Priority is greater than 5"],
        required:true,
        default:5
    },
    status:{
        type:String,
        required:true,
        enum:Object.values(ticketStatus),
        default:ticketStatus.open
    },
    requestor:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
     assignee:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
}, {timestamps:true})

module.exports =  mongoose.model("Ticket", ticketSchema);