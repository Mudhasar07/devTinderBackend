const express = require('express');
const requestRoute = express.Router();
const {userAuth} = require("../middlewares/auth");
const userModel = require("../models/userModel");
const RequestModel = require('../models/requestModel');

requestRoute.post("/send/:status/:toUserId", userAuth, async (req, res)=> {
    try{
        const fromUserId = req.user._id;
        const requestStatus = req.params.status;
        const toUserId = req.params.toUserId;

        const allowedStatus = ["Interested", "Ignored"];
        const isValidRequestStatus = allowedStatus.includes(requestStatus);
        console.log(isValidRequestStatus, "isValidRequestStatus");

        if(!isValidRequestStatus){
            return res.status(400).json({
                Message: `${requestStatus} is not valid status Type.`
            });
        }

        const user = await userModel.findById(toUserId);
        if(!user){
            return res.status(400).json({
                Message: "User not found!"
            })
        }

        const isRequestAlreadySent = await RequestModel.find({
            $or:[
                {fromUserId, toUserId},
                {fromUserId: toUserId, toUserId: fromUserId}
            ]
        })
        console.log(isRequestAlreadySent.length, "isRequestAlreadySent");

        if(isRequestAlreadySent.length > 0){
            return res.status(400).json({
                message: "Conntection request already sent to this USER"
            })
        }

        const newRequest = {
            fromUserId: fromUserId,
            toUserId: toUserId,
            requestStatus: requestStatus
        }
        
        const createNewRequest = new RequestModel(newRequest);
        // Pre function we can use => Before Save, Automatically PRE function can execute. We can write this function inside our Models.
        await createNewRequest.save();
        return res.status(200).json({
            Message: `Connection status ${requestStatus} sent to ${user.firstName}`,
            Data: createNewRequest
        })
    }
    catch(err){
        res.send("Err while send Requets "+ err);
    }
})

requestRoute.post("/request/review/:status/:requestId", userAuth, async (req, res, next) => {
    try{
        const LoggedInUser = req.user;
        const {status, requestId} = req.params;
        const allowedStataus = ["Accepted", "Rejected" ];

        if(!allowedStataus.includes(status)){
            return res.status(400).json({Message: `status ${status} is not valid`});
        }

        const reviewConnection = await RequestModel.findOne({
            requestStatus: "Interested",
            _id: requestId,
            toUserId: LoggedInUser._id
        });

        if(!reviewConnection){
            return res.status(400).json({Message: `Review Request not found`});
        }

        reviewConnection.requestStatus = status;
        const acceptConnectionData = await reviewConnection.save();
        return res.status(200).json({Message: `connection status ${status}.`, acceptConnectionData });
    }
    catch(err){
        return res.status(400).json({message: `Err while Review Requeste: ${err.message}`});
    }
})

module.exports = requestRoute;