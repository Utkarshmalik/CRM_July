const userModel = require("../Models/userModel");
const { userStatus } = require("../utils/constants");

const getAllUsers= async (req,res)=>{

    //add code here to check if user is autenticated 
    //add code here to check if user is admin  

    try{
    const users = await userModel.find({});
    return res.send(users);

    }
    catch(err){
        return res.status(500).send({message:err.message})
    }
}


const updateUser = async (req,res)=>{

    const {approveUser, userId} = req.metadata;
    
    try{

        if(approveUser){
            const user =await userModel.findOneAndUpdate({userId:userId},{userStatus:userStatus.approved});

            if(!user){
                return res.status(400).send({message:"Invalid User Id Passed"});
            }

            return res.status(200).send({message:"User approved successfully"});
        }

    }
    catch(err){
        console.log(err);
    }

}

module.exports={
    getAllUsers,
    updateUser
}