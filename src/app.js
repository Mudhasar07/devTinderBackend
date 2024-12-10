const express = require('express');
const app = express();
const connectDB = require("./config/database");
const cookieParser = require('cookie-parser'); // npm i cookie-parser

app.use(express.json()); // Convert the JSON Notation to JS Object 
app.use(cookieParser()); // Receive the cookies from browser or postman => Collects.

// Route Handler:
const authRouter = require("./routes/authRoute");
const profileRouter = require("./routes/profileRoute");
const requestRouter = require("./routes/requestRoute");
const userRouter = require("./routes/userRoute");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

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

