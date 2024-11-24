const express = require('express');
const app = express();
const connectDB = require("./config/database");
const UserSchema = require("./models/userModel");

// Route Handler.

app.post("/signUp", async (req, res)=>{
    const userObject = new UserSchema({
        firstName: "shifan",
        lastName: "Ahamed",
        age: 10,
        emailid: "shifan@gmail.com",
        password: "121212",
        gender: "male"
    });
    await userObject.save();
    res.send("user ceated Successfully")

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

