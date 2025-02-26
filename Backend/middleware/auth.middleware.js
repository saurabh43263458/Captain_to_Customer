const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

module.exports.authUser = async (req, res, next) => {

    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token" });
    }
    const isblackedlist = await userModel.findOne({token});
    if(isblackedlist){
        return res.status(401).json({"success":false,"message":"unauthorized"});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

        req.user = user;
       

        return next();
    } catch (err) {
        console.log("🔴 Token verification failed:", err);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};
