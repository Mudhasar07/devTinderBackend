const express = require("express");
const authRoute = express.Router();
const UserModel = require("../models/userModel");
const bcrypt = require('bcrypt');
const {validateSignUpData} = require("../utilsOrHelper/validation"); // npm i validator
const {userAuth} = require("../middlewares/auth");
const jwt = require('jsonwebtoken');

authRoute.post("/signUp", async (req, res)=>{
    try{
        validateSignUpData(req);
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        console.log(hashPassword, " --> I am hashPasssword");

        const createNewUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            emailId: req.body.emailId,
            password: hashPassword,
            age: req.body.age,
            gender: req.body.gender,
            skills: req.body.skills
        }

        const userObject = new UserModel(createNewUser);
        await userObject.save();
        res.send("User Created Succfully");
    }
    catch(err){
        res.send(err + " while creating new User"); 
    }
})

authRoute.post("/login", async (req, res)=>{
    try{
    const {emailId, password} = req.body;
    const checkUserExist = await UserModel.findOne({emailId: emailId});
    if(checkUserExist.length < 1){
        throw new Error ("Not valid Email ID");
    }

    const userHashPassword = checkUserExist.password
    console.log(userHashPassword, "userhashpassword");

    // const isCheckUserPassword = await bcrypt.compare(password, userHashPassword )
    const isCheckUserPassword = await checkUserExist.validateUserHashPassword(password, userHashPassword)

    console.log(isCheckUserPassword, "ischeckUserhashpass");

    if(!isCheckUserPassword){
        throw new Error ("Invalid credentail");
    }

    // Create JWT Token
    const token = await checkUserExist.getJWTToken();
    res.cookie("token", token, { expires: new Date(Date.now() + 6 * 3600000), httpOnly: true }); //Cookie Will Expire After 6 Days
    res.send("Logging In Successfully");
    }
    catch(err){
        res.send(err + " --> While Login");
    }
});

authRoute.get("/logout", async (req, res)=>{
    res.cookie("token", null, { expires: new Date(Date.now())});
    res.send("Logout Successfully");
    }
);

module.exports = authRoute;