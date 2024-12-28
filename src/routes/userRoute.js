const express = require('express');
const userRoute = express.Router();
const UserModel = require("../models/userModel");
const { userAuth } = require('../middlewares/auth');
const RequestModel = require("../models/requestModel");

// User Safe Data - Sending in API Response => Required Field Only to send => Avoiding Unnessary Key: Fields
const usersafeData = "firstName lastName skills age gender emailId"

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

// All Main Route related to DEV-Tinder-Project..

userRoute.get("/user/request/received", userAuth, async (req, res) => {
    try{
        const loggedInUser = req.user;

        const getAllConnectionRequest = await RequestModel.find({
            requestStatus: "Interested",
            toUserId: loggedInUser._id
        // }).populate("fromUserId", ["firstName", "lastName", "age", "gender"]) 
        }).populate("fromUserId", "firstName lastName age gender skills description"); // Populate using REF from Models and fetching the USER data


        if(!getAllConnectionRequest.length < 0){
            return res.status(404).json({Message: `No Requested Found`});
        }

        if(!getAllConnectionRequest.length < 0){
            return res.status(404).json({Message: `No Requested Found`});
        }

        return res.status(200).json({Message: `The Received connection requests are: `, getAllConnectionRequest});
    }
    catch (err){
        return res.status(400).json({Message: `Error While getting user received request: ${err.message}`});
    }
});

userRoute.get("/user/connections", userAuth, async (req, res)=> {
    try{
        const loggedInUser = req.user;
        const findAllConnections = await RequestModel.find({
            $or: [
                {requestStatus: "Accepted", toUserId: loggedInUser._id},
                {requestStatus: "Accepted", fromUserId: loggedInUser._id }
            ]
        })
        .populate("fromUserId", usersafeData)
        .populate("toUserId", usersafeData);
        // .populate("fromUserId", ["firstName", "lastName", "skills", "age"]);
        if(findAllConnections.length < 1){
            return res.status(400).json({Message: `No Connection Found.`})
        }

        const data = findAllConnections.map(acceptedUser => {
            if(acceptedUser.fromUserId._id.toString() === loggedInUser._id.toString()){
                return acceptedUser.toUserId
            }
                return acceptedUser.fromUserId
        })
        return res.status(200).json({Message: `Connection Requests Found successfully`, data});
    }
    catch(err){
        return res.send(400).json({Message: `Error While fetch Connections Request.`});
    }
});

userRoute.get("/feed", userAuth, async (req, res)=> {
    try{
        loggedInUser = req.user;
        const {_id, fromUserId, toUserId} = loggedInUser;

        const hideUsersFromFeedAPi = await RequestModel.find({
            $or:[
                {fromUserId: _id},
                {toUserId: _id}
            ]
        })
        .select('fromUserId toUserId requestStatus')
        .populate("fromUserId", "firstName lastName emailId")
        .populate("toUserId", "firstName lastName emailId")

        // Find All Unique USER => Remove duplicate USER 
        const hideUserUniqueIdList = new Set();

        hideUsersFromFeedAPi.forEach(users => {
            hideUserUniqueIdList.add(users.fromUserId._id.toString())
            hideUserUniqueIdList.add(users.toUserId._id.toString())
        });
        console.log(hideUserUniqueIdList, "hideUsersList")

        const listUserFeed = await UserModel.find({
            $and: [
                {_id: {$nin: Array.from(hideUserUniqueIdList)}},
                {_id: {$ne: _id}}
            ]
        }).select(usersafeData);

        res.status(200).json({dataa: listUserFeed});
    }
    catch(err){
        res.status(400).json({ErrMessage: err.message})
    }
});


// // Route Handler.
// app.use("/admin", userAuth); // Added Middleware
// app.get("/admin/getData", (req, res)=>{
//     res.send("get /admin all data")
// })

module.exports = userRoute;