

const ticketCreation = (user,ticket) => {
    
    return{
    subject: "Ticket Raised Successfully",
    html:`

    <div>

    <h4>  Hello ${user.name}, </h4>

    <br/>

    You have created a ticket successfully with ticketId : ${ticket._id}

    <br/>

    Details of the ticket created are :
    <br/>

    title : <strong> ${ticket.title} </strong>   <br/>
    description : <strong> ${ticket.description} </strong>   <br/>
    status : <strong> ${ticket.status} </strong>   <br/>
    priority : <strong> ${ticket.ticketPriority} </strong>   <br/>

    <br/>

    Thanks and Regards

    CRM leadership team 
     <br/>
     <br/>

     <img height="200" width="200" src="https://www.clutch.com/wp-content/uploads/2018/05/CRM-Mag-Logo.png" />

    </div>
    `
    }
}


const ticketUpdation = (user,ticket) => {
    
    return{
    subject: "Ticket Status Updated",
    html:`

    <div>

    <h4>  Hello ${user.name}, </h4>

    <br/>

    Your Ticket with title <strong> ${ticket.title} </strong> and id :  <strong> ${ticket._id} </strong>
    has been updated to a new status  <strong> ${ticket.status} </strong>

    <br/>

    Details of the ticket after updation are :
    <br/>

    title : <strong> ${ticket.title} </strong>   <br/>
    description : <strong> ${ticket.description} </strong>   <br/>
    status : <strong> ${ticket.status} </strong>   <br/>
    priority : <strong> ${ticket.ticketPriority} </strong>   <br/>

    <br/>

    Thanks and Regards

    CRM leadership team 
     <br/>
     <br/>

     <img height="200" width="200" src="https://www.clutch.com/wp-content/uploads/2018/05/CRM-Mag-Logo.png" />

    </div>
    `
    }
}



module.exports={
    ticketCreation,
    ticketUpdation
}