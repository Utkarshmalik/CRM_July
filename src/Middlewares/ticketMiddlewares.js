const ticketModel = require("../Models/ticketModel");
const { userTypes } = require("../utils/constants");


const verifyCreateTicketRequest=(req,res,next)=>{

    const {title, description, ticketPriority } = req.body;

    if(!title){
        return res.status(400).send({message:"Title cannot be null"});
    }

    if(!description){
        return res.status(400).send({message:"Description cannot be null"});
    }

    if(ticketPriority &&  
        ( !Number.isInteger(ticketPriority) || (ticketPriority<1 && ticketPriority>5))){
        return res.status(400).send({message:"Invalid Ticket Priorirty passed"});
    }

    next();
};

const verifyGetTicketDetailsRequest = async (req,res,next)=>{
    
    const {ticketId} = req.params;
    const user=req.user;
    const userType = user.userType;

    if(userType===userTypes.admin){
        next();
        return;
    }
    
    const ticketDetails = await ticketModel.findById(ticketId);


    if(!ticketDetails){
        return res.status(400).send({message:"Invalid Ticket Id"});
    }

    if(userType===userTypes.customer && !ticketDetails.requestor.equals(user._id)){
        return res.status(403).send({message:"UnAuthorized to acess this Ticket Id"});
    }

     if(userType===userTypes.engineer && !ticketDetails.assignee.equals(user._id)){
        return res.status(403).send({message:"UnAuthorized to acess this Ticket Id"});
    }

    next();
}

module.exports={
    verifyCreateTicketRequest,
    verifyGetTicketDetailsRequest
}