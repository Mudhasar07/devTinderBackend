const express = require('express');
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth");


profileRouter.get('/profile', userAuth,  async(req, res, next) => {
    try{
    const user = req.user;
    res.send("Login User is : " + user);
    }
    catch(err){
    res.send("Catch err " + err.message);
    }      
})

module.exports = profileRouter;