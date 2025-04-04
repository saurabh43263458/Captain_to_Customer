const blacklist = require('../models/blacklistToken');
const userModel = require('../models/user.model')
const userService = require('../service/user.service')
const {validationResult} = require('express-validator');

module.exports.registerUser = async (req,res,next) =>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
  }
  console.log(req.body)
  const {fullname,email,password} = req.body;
  const hashPassword = await userModel.hashPassword(password);
  const isUserAlready = await userModel.findOne({email});
  if(isUserAlready){
    res.status(400).json({"successor":false,message:"user already exist"});
  }
  
  const user =await userService.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password:hashPassword
  });

  const token = user.generateAuthToken();
  res.status(201).json({token,user})
}

module.exports.loginUser =async (req,res,next) =>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
  }
  const {email,password} = req.body;
  const user = await userModel.findOne({email}).select('+password');
  if(!user){
    return res.status(401).json({message:'Invalid email or password'});
  }
  const isMatch  =await user.comparePassword(password);

  if(!isMatch){
     return res.status(401).json({message:'Invalid email or password'});
  }
   const token = user.generateAuthToken();
   res.cookie('token',token);
   res.status(200).json({token,user})
}

module.exports.getUserProfile = async (req, res,next) => {
  if (!req.user) {
      return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({"success":true ,"message":`${req.user}`});
  next();
};

module.exports.logout = async(req,res,next)=>{
  res.clearCookie('token');
  const token = req.cookies.token || req.headers.authorization.split(' ')[1];
   await blacklist.create({token});
   res.status(200).json({"success":true,"message":"user is logedOut"});
};