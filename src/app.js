const express = require('express');
const app = express();

// Route Handler.

app.use("/server",(req, res)=>{
    res.send("Hello World from server");
})

app.use("/test/one",function (req, res){
    res.send("From Test /one");
})

app.use("/dev/getData",function (req, res){
    res.send("Get Dev Data");
})

app.use("/test",function (req, res){
    res.send("Test me, I am From /test routes");
})

app.use('/', (req, res)=>{
    res.send("Hello Route");
})

app.listen(7777, ()=>{
    console.log('Server is running on port 7777...')
});