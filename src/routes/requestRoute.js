const express = require('express');
const requestRoute = express.Router();
const {userAuth} = require("../middlewares/auth");

requestRoute.post("/sendConnectionRequest", userAuth, async (req, res)=> {
    try{
    const user = req.user;
    if(!user){
        throw new Error("invalid user")
    }
    res.send(user.firstName + " sent connection request");
    }
    catch(err){
        res.send(err)
    }
})

module.exports = requestRoute;