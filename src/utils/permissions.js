const { userTypes } = require("./constants");


const getUpdateTicketPermissions=()=>{

    const {customer, admin, engineer} = userTypes
    const ALL=[customer, admin, engineer]

    return{
    title:[...ALL],
    description:[...ALL],
    ticketPriority:[...ALL],
    status:[...ALL],
    assignee:[admin]
    }
}

module.exports={
    getUpdateTicketPermissions
}

