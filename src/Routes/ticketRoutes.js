const { createTicket, getTickets, getTicketDetails, updateTicketDetails, deleteTicket } = require("../Controllers/ticketControllers");
const { verifyToken, isAdmin } = require("../Middlewares/authMiddleware");
const { verifyCreateTicketRequest, verifyGetTicketDetailsRequest, verifyTicketAccess, verifyUpdateTicketRequest } = require("../Middlewares/ticketMiddlewares");

module.exports=  function(app){

    app.post("/crm/api/v1/tickets",[verifyToken, verifyCreateTicketRequest],createTicket);
    app.get("/crm/api/v1/tickets",[verifyToken], getTickets);
    app.get("/crm/api/v1/tickets/:ticketId",[verifyToken, verifyTicketAccess], getTicketDetails);
    app.put("/crm/api/v1/tickets/:ticketId",[verifyToken, verifyTicketAccess, verifyUpdateTicketRequest],updateTicketDetails)
    app.delete("/crm/api/v1/tickets/:ticketId",[verifyToken, isAdmin],deleteTicket)

}