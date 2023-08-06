const ticketModel = require("../Models/ticketModel");
const { userTypes } = require("../utils/constants");
const { getUpdateTicketPermissions } = require("../utils/permissions");


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

const verifyTicketAccess = async (req,res,next)=>{
    
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


const verifyUpdateTicketRequest=(req,res,next)=>{

    const permissions = getUpdateTicketPermissions();
    const userType = req.user.userType

    for(let key in req.body){

        if(!permissions[key]){
            return res.status(400).send({message:`Invalid field :[${key}] passed, cannot be updated`});
        }

        if(key && !permissions[key].includes(userType) ){
            return res.status(403).send({message:`User with userType:[${userType}] is not allowed to update [${key}] field`})
        }
    }

    next();

}

module.exports={
    verifyCreateTicketRequest,
     verifyTicketAccess,
     verifyUpdateTicketRequest
}