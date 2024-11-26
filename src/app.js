const express = require('express');
const app = express();
const connectDB = require("./config/database");
const UserSchema = require("./models/userModel");
const userModel = require('./models/userModel');

app.use(express.json()); // Convert the JSON Notation to JS Object 
// Route Handler.

app.post("/signUp", async (req, res)=>{
    const createNewUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailId: req.body.emailId,
        password: req.body.password,
        age: req.body.age,
        gender: req.body.gender
    }
    const userObject = new UserSchema(createNewUser);
    await userObject.save();
    res.send("user Created Succfully");
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

app.patch("/updateUser", async (req, res)=>{
    try{
        const updateUser = await userModel.findOneAndUpdate({_id: req.body.id},{firstName: req.body.firstName}, {returnDocument: 'before'});
        res.send(updateUser)
    }catch(err){
        res.send(err);
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
        console.error("error connecting DB", err)
    })

