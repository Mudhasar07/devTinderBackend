const express = require('express');
const app = express();
const connectDB = require("./config/database");
const UserSchema = require("./models/userModel");
const userModel = require('./models/userModel');
const validator = require('validator');

app.use(express.json()); // Convert the JSON Notation to JS Object 
// Route Handler.

app.post("/signUp", async (req, res)=>{
    try{
        const isValidEmail = validator.isEmail(req.body.emailId)
        if(!isValidEmail){
        throw new Error("Invalid Email ID Format")
        }

        const isStrongPassword = validator.isStrongPassword(req.body.password)

        if(!isStrongPassword){
            throw new Error("Please Enter some Strong Password");
        }

        const isPhotoUrl = validator.isURL(req.body.photoUrl);
        if(!isPhotoUrl){
            throw new Error("Please valid photo URL")
        }

        const createNewUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            emailId: req.body.emailId,
            password: req.body.password,
            age: req.body.age,
            gender: req.body.gender,
            skills: req.body.skills
        }

        const userObject = new UserSchema(createNewUser);
        await userObject.save();
        res.send("user Created Succfully");
    }
    catch(err){
        res.send(err + " while creating new User"); 
    }
})

app.get('/allUser', async (req, res)=> {
    const allUserRecord = await userModel.find({});
    res.send(allUserRecord);
});

app.get("/userByParam", async (req, res)=> {
    try{
        const userRecord = await userModel.findOne({firstName: "seeni"});
        res.send(userRecord);
    }catch(err){
        res.send(err);
    }
})

app.post("/userByParam", async (req, res)=> {
    try{
        const userRecord = await userModel.findOne({firstName: req.body.firstName̵});
        res.send(userRecord);
    }catch(err){
        res.send(err);
    }
})

app.patch("/updateUser/:userId", async (req, res)=>{
    const data = req.body;
    const userId = req.params.userId

    try{
        console.log(req.body,"ddddd")
        const ALLOWED_UPDATES  = [ "firstName", "lastName", "skills", "password", "emailId"] ;
        const isUpdateAllowed = Object.keys(data).every((k)=>
            ALLOWED_UPDATES.includes(k)
        )

        if(!isUpdateAllowed){
            throw new Error("Unable to update Manditory field");
        }

        if(req.body?.skills.length > 10){
            throw new Error("Skills cannot be more than 10");
        }

        const updateUser = await userModel.findByIdAndUpdate({_id: userId}, req.body, {returnDocument: "after"});
        res.send(updateUser)
    }
    catch(err){
        res.send("Update Fail Error is --> " + err.message);
    }
})

app.delete("/deleteUser/:id", async (req, res) => {
    try{
        const deleteUser = await userModel.findOneAndDelete({_id: req.params.id})
        res.send(deleteUser);
    }
    catch(err){
        res.send(err);
    }

});

connectDB()
    .then(()=>{
        console.log("DB connected Successfully");
        app.listen(7777, ()=>{
            console.log('Server is running successfully on port 7777...');
        });
    })
    .catch((err)=> {
        console.error("error while connecting DB", err)
    })

