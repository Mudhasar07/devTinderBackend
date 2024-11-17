const express = require('express');
const app = express();

// Route Handler.

app.use("/server",(req, res)=>{
    res.send("Hello World from server");
})

app.use("/test",function (req, res){
    res.send("Test me, I am From /test server");
})


app.listen(7777, ()=>{
    console.log('Server is running on port 7777...')
});