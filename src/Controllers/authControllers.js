const bcrypt = require("bcrypt");
const userModel = require("../Models/userModel");
const { userTypes, userStatus } = require("../utils/constants");
const jwt = require("jsonwebtoken");

const register = (req,res)=>{

    const {name, userId, email, password, userType} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = {
        name,
        userId,
        email,
        password:hashedPassword,
        userType,
        userStatus:(userType===userTypes.customer)?userStatus.approved:userStatus.pending
    }

    const newUser = new userModel(user);

    newUser.save().then(data=>{
    res.status(201).send({message:"User Created successfully!"});
    })
    .catch(err=>{

        if(err.code===11000){
            return res.status(400).send({message:"UserId/Email already exists in the database"});
        }

        return res.status(500).send({message:err.message})
    })
}

const login = async (req,res)=>{
    console.log(req.body);
    const {userId, password} = req.body;

    if(!userId || !password){
        return res.status(400).send({message:"UserId/Password is not passed"});
    }

    try{
      const user =  await userModel.findOne({userId:userId});

      if(!user){
        return res.status(404).send({message:`UserId : ${userId} is invalid`})
      }

      

      
      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if(!isPasswordValid){
            return res.status(404).send({message: "Invalid Password"})
      }

      //jwt token 
     const token = jwt.sign({id:userId}, process.env.SECRET, { expiresIn: '1h' });


     return res.status(200).send({
        name:user.name,
        userId:user.userId,
        email:user.email,
        userType:user.userType,
        userStatus:user.userStatus,
        accessToken:token

     })
    }
    catch(err){
        return res.status(500).send({message:err.message})
    }

}


module.exports ={
    register,
    login
}