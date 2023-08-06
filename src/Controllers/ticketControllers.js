const userModel = require("../Models/userModel");
const ticketModal = require("../Models/ticketModel");

const { ticketStatus, userTypes } = require("../utils/constants");
const { ticketCreation, ticketUpdation } = require("../scripts/ticket");
const { sendEmail } = require("../utils/Notifications");


const createTicket = async (req,res)=>{

    const {title, description, ticketPriority } = req.body;
    const user = req.user;

    const newTicket = {
        title, 
        description,
        ticketPriority,
        status:ticketStatus.open,
        requestor:user._id,
        assignee:await findEngineer()
    }

    try{
        const ticket = new ticketModal(newTicket);

        const ticketCreated = await ticket.save();

           const {subject, html} = ticketCreation(user, ticketCreated);
          sendEmail([user.email],subject, html);
    

        return res.status(200).send(ticketCreated);
    }
    catch(err){
        return res.status(500).send({message:err.message})
    }
}


const getTickets = async (req, res)=>{

    const userType = req.user.userType;
    const {status} = req.query;

    const query={};

    if(userType===userTypes.customer){
        query.requestor=req.user._id
    }

    if(userType===userTypes.engineer){
        query.assignee=req.user._id
    }

    if(status && !Object.values(ticketStatus).includes(status) ){
        return res.status(400).send({message:`status passed : ${status} is invalid`})
    }

    if(status){
        query.status=status;
    }


 try{
        const tickets = await ticketModal.find(query);

        return res.status(200).send(tickets);
    }
    catch(err){
        return res.status(500).send({message:err.message})
    }
}

const getTicketDetails = async (req,res)=>{

    const {ticketId} = req.params;

      try{
        const ticket = await ticketModal.find({_id:ticketId});

        return res.status(200).send(ticket);
    }
    catch(err){
        return res.status(500).send({message:err.message})
    }
}


const updateTicketDetails=async (req,res)=>{

    const {ticketId} = req.params;

    const ticketDetails = {...req.body};

     try{
        const updatedTicket = await ticketModal.findByIdAndUpdate(ticketId, ticketDetails, 
            {
        new: true,
      });

      if(ticketDetails.status){
        const user = await userModel.findById(updatedTicket.requestor);
            const {subject, html} = ticketUpdation(user, updatedTicket);

            sendEmail([user.email],subject, html);
       }

        return res.status(200).send(updatedTicket);
    }
    catch(err){
        return res.status(500).send({message:err.message})
    }

}


const deleteTicket= async (req,res)=>{

    const {ticketId} = req.params;
    
    try{
        const ticket= await ticketModal.findByIdAndDelete(ticketId);

        if(!ticket){
         return res.status(400).send({message:"Invalid Ticket id"});
        }

        return res.status(200).send({message:"Ticket deleted successfully"});
    }
    catch(err){
        return res.status(500).send({message:err.message})
    }
}


const findEngineer = async ()=>{
    
    const engineers = await userModel.find({userType:userTypes.engineer});

    // TODO : find the engineer with the least amount of tickets in open/inProgress state 

    if(!engineers.length){
        return null;
    }

    const engineer= engineers[(Math.floor(Math.random() * engineers.length))];

    console.log(engineer);
    return engineer._id;
}


module.exports = {
    createTicket, 
    getTickets,
    getTicketDetails,
    updateTicketDetails,
    deleteTicket
}