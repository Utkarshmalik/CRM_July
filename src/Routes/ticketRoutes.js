const { createTicket, getTickets, getTicketDetails } = require("../Controllers/ticketControllers");
const { verifyToken } = require("../Middlewares/authMiddleware");
const { verifyCreateTicketRequest, verifyGetTicketDetailsRequest } = require("../Middlewares/ticketMiddlewares");

module.exports=  function(app){

    app.post("/crm/api/v1/tickets",[verifyToken, verifyCreateTicketRequest],createTicket);
    app.get("/crm/api/v1/tickets",[verifyToken], getTickets);
    app.get("/crm/api/v1/tickets/:ticketId",[verifyToken, verifyGetTicketDetailsRequest], getTicketDetails);

}