const express = require('express');
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const {validateProfileEdit, validateStrongPassword} = require("../utilsOrHelper/validation");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

profileRouter.get('/profile/view', userAuth, async(req, res, next) => {
    try{
    const user = req.user;
    res.status(200).json({"Login User is":user});
    }
    catch(err){
    res.send("Catch err " + err.message);
    }      
});

profileRouter.patch("/profile/edit", userAuth, async (req, res)=> {
    try{
        if(!validateProfileEdit(req)){
        return res.json({Error: "Edit not valid" });
        }
        // user["firstName"]= req.body.firstName,
        // user["age"]= req.body.age;
        
        const user = req.user;
        console.log(user, "user details")

        const userTryingToEdit = Object.keys(req.body)
        userTryingToEdit.forEach(keys => {
            user[keys] = req.body[keys];
        });

        console.log(user, "user details");
        await user.save();
        return res.json({
            Message: `Hi ${user.firstName}, Your profile Upadted Successfully`,
            Data: user
        });
    }
    catch(err){
        res.send("err " + err.message)
    }
});

profileRouter.patch("/profile/password", userAuth, async (req, res, next)=> {
    try{
    const user = req.user;
    const isStrongPassword = validateStrongPassword(req.body.newPassword);
    if(!isStrongPassword){
        return res.status(400).json({Message: `${req.body.newPassword} - is not STRONG Password.`})
    }
    const isSamePassword = await user.isSameAsOldPassword(res, req.body.newPassword, user.password);
    if(isSamePassword){
        res.status(400).json({Message: "Existing & New Password are same. please enter different password"})
    }
    const hashNewPassword = await bcrypt.hash(req.body.newPassword, 10);
    user.password = hashNewPassword;
    await user.save();
    res.status(200).json({Message: "Password Updated successfully", Data: user});
    return
    }
    catch(err){
        res.status(err.message);
    }
})

module.exports = profileRouter;