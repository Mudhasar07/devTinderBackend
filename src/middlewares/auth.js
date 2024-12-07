const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
    try{
    const {token} = req.cookies;
    if(!token){
        throw new Error("Token is Missing");
    }
    const decodeTokenMessage = await jwt.verify(token, "mySecretKey");
    if(!decodeTokenMessage){
        throw new Error("Invalid Token");
    }
    const {_id} = decodeTokenMessage;
    const user = await UserModel.findById(_id);
    if(!user){
        throw new Error("Invalid User");
    }
    req.user = user;
    next()
    // res.send("Logged in User is: "+ user) // This is middleware So we are return here, If required we can return from here.
    }
    catch(err){
       res.send("error " + err.message);
    }
}

module.exports = {
    userAuth
}