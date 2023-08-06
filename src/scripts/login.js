

const userLogin = user=> {
    
    return{
    subject: "Login Sucessful",
    html:`

    <div>

    <h4>  Hello ${user.name}, </h4>

    <br/>

    You have logeedin successfully to CRM application with email ${user.email} and role ${user.userType} 

    <br/>
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
    userLogin
}