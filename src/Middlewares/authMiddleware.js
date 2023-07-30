const jwt = require("jsonwebtoken");
const userModel = require("../Models/userModel");
const { userTypes } = require("../utils/constants");

//check whether the user is authenticated or not 

const verifyToken = async (req,res,next)=>{

    //check whether the token is passed or not

    const token = req.headers['x-access-token'];

    if(!token){
        return res.status(403).send({message:"No Token Provided"});
    }

    try {
      var payload = jwt.verify(token, process.env.SECRET);
      const user = await userModel.findOne({userId:payload.id});
      req.user = user;
         next();
} catch(err) {
     return res.status(403).send({message:"Invalid JWT Passed"});
    }
}

const isAdmin = async (req,res,next)=>{
    
    if(req.user.userType !== userTypes.admin){
    return res.status(403).send({message:"Only Admin users are allowed to access this route"});
    }

    next();
}

module.exports={
    verifyToken,
    isAdmin
}