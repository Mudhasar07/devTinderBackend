const express = require('express');
const userRoute = express.Router();
const UserModel = require("../models/userModel");

userRoute.get('/allUser', async (req, res)=> {
    const allUserRecord = await UserModel.find({});
    res.send(allUserRecord);
});

userRoute.get("/userByParam", async (req, res)=> {
    try{
        const userRecord = await UserModel.findOne({firstName: "seeni"});
        res.send(userRecord);
    }catch(err){
        res.send(err);
    }
})

userRoute.post("/userByParam", async (req, res)=> {
    try{
        const userRecord = await UserModel.findOne({firstName: req.body.firstName});
        res.send(userRecord);
    }catch(err){
        res.send(err);
    }
})

userRoute.patch("/updateUser/:userId", async (req, res)=>{
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

        const updateUser = await UserModel.findByIdAndUpdate({_id: userId}, req.body, {returnDocument: "after"});
        res.send(updateUser)
    }
    catch(err){
        res.send("Update Fail Error is --> " + err.message);
    }
})

userRoute.delete("/deleteUser/:id", async (req, res) => {
    try{
        const deleteUser = await UserModel.findOneAndDelete({_id: req.params.id})
        res.send(deleteUser);
    }
    catch(err){
        res.send(err);
    }

});

// // Route Handler.
// app.use("/admin", userAuth); // Added Middleware
// app.get("/admin/getData", (req, res)=>{
//     res.send("get /admin all data")
// })

module.exports = userRoute