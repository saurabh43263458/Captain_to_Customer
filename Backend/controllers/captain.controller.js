const captainModel = require("../models/captain.model");
const captainService = require('../service/captain.service');
const {validationResult} = require('express-validator');


module.exports.registerCaptain = async(req,res,next)=>{
    const error = validationResult(req);
    if(!error){
        res.status(400).json({"successor":false,"message":"something is not right"});
    }
    const {fullname, email,password,vehicle} = req.body
    const hashedpassword = await captainModel.hashed(password);
    const isEmailAlready = await captainModel.findOne({email});
    if(isEmailAlready){
        res.status(400).json({"successor":false,"message":"user already present"});
    }
    const captain = await captainService.createCaptain({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email:email,
        password:hashedpassword,
        color:vehicle.color,
        plate:vehicle.plate,
        capacity:vehicle.capacity,
        vehicleType:vehicle.vehicleType
    })

    const token = captain.generateAuthToken();
    res.status(200).json({token,captain});
}
