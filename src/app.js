const express = require('express');
const app = express();
const connectDB = require("./config/database");
const UserSchema = require("./models/userModel");

app.use(express.json()); // Convert the JSON Notation to JS Object 
// Route Handler.

app.post("/signUp", async (req, res)=>{

    console.log("reqBody", req.body) // Need to pass it as Javascript Object.
    
    const userObject = new UserSchema(req.body);
    await userObject.save();
    res.send("user Created Succfully");

})

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

