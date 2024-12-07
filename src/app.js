const express = require('express');
const app = express();
const connectDB = require("./config/database");
const UserModel = require('./models/userModel');
const bcrypt = require('bcrypt'); 
const cookieParser = require('cookie-parser'); // npm i cookie-parser
const {validateSignUpData} = require("./utilsOrHelper/validation"); // npm i validator
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth");
app.use(express.json()); // Convert the JSON Notation to JS Object 
app.use(cookieParser()); // Receive the cookies from browser or postman => Collects.
// Route Handler.
app.use("/admin", userAuth); // Added Middleware
app.get("/admin/getData", (req, res)=>{
    res.send("get /admin all data")
})
app.post("/signUp", async (req, res)=>{
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

app.post("/login", async (req, res)=>{
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
    res.cookie("token", token, { expires: new Date(Date.now() + 1 * 3600000), httpOnly: true });
    res.send("Logging In Successfully");
    }
    catch(err){
        res.send(err + " --> While Login");
    }
});

app.get('/profile', userAuth,  async(req, res) => {
    try{
    const user = req.user;
    res.send("Login User is : " + user);
    }
    catch(err){
    res.send("Catch err " + err.message);
    }      
})

app.post("/sendConnectionRequest", userAuth, (req, res)=> {
    try{
    const user = req.user;
    if(!user){
        throw new Error("invalid user")
    }
    res.send(user.firstName + " sent connection request");
    }
    catch(err){
        res.send(err)
    }
})

app.get('/allUser', async (req, res)=> {
    const allUserRecord = await UserModel.find({});
    res.send(allUserRecord);
});

app.get("/userByParam", async (req, res)=> {
    try{
        const userRecord = await UserModel.findOne({firstName: "seeni"});
        res.send(userRecord);
    }catch(err){
        res.send(err);
    }
})

app.post("/userByParam", async (req, res)=> {
    try{
        const userRecord = await UserModel.findOne({firstName: req.body.firstName̵});
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

        const updateUser = await UserModel.findByIdAndUpdate({_id: userId}, req.body, {returnDocument: "after"});
        res.send(updateUser)
    }
    catch(err){
        res.send("Update Fail Error is --> " + err.message);
    }
})

app.delete("/deleteUser/:id", async (req, res) => {
    try{
        const deleteUser = await UserModel.findOneAndDelete({_id: req.params.id})
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

