const nodemailer = require("nodemailer");


const sendEmail = (recipients, subject, html )=>{

    let recipientString = recipients.join(", ");


    let mailTransporter  = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"utkarshmalik06@gmail.com",
            pass:"gcwkbwtjwsnxvnwf"
        }
    })

    let mailDetails = {
        from :"utkarshmalik06@gmail.com",
        to:recipientString,
        subject:subject,
        html:html
    }


    mailTransporter.sendMail(mailDetails, (err,data)=>{

        if(err){
            console.log("Unable to send an email", err);
        }else{
            console.log("Email sent succesfully");
        }
    })

}


module.exports={
    sendEmail
}

