const { userTypes } = require("../utils/constants");


const verifyUpdateRequest=(req,res,next)=>{

      const approveUser = JSON.parse(req.query.approve);
      const userId = req.params.userId;

      if(approveUser && req.user.userType!==userTypes.admin){
        return res.status(403).send({message:"Only Admin users are allowed to approve other users"});
      }

      req.metadata={
        approveUser, userId
      }

      next();
}


module.exports={
    verifyUpdateRequest
}