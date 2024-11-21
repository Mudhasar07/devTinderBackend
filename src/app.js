const express = require('express');
const app = express();

// Route Handler.


app.get("/hij",(req, res)=>{
    res.send("Hello Regex Route 1")
})

// http://localhost:7777/abc --> http://localhost:7777/ac --> In both scenario it will work. --> b is optional if want we can pass else leave it.
app.get("/ab?c",(req, res)=>{
    res.send("Regex route call ab?c")
})

// http://localhost:7777/abbbbbbc -> http://localhost:7777/abcdfdfdfdc -> In both scenario it will work.
// http://localhost:7777/abcdfdfdfdc -> It wont work -->
app.get("/ef+g",(req, res)=>{
    res.send("regex route call ef+g")
})

//http://localhost:7777/pqANYTHINGINB/wrs -> Add anything in between pq*rs -> it will work -> but pattern matters.
app.get("/pq*rs",(req, res)=>{
    res.send("regex route call (anything can work inbetween (pq _*_ rs)")
})

// Regex -> any of this word contain then it will work.
app.get(/aa/,(req, res)=>{
    res.send("If aa is available then it print result (aa)");
})

//find match inside route regex
app.get(/.*fly$/,(req, res)=>{
    res.send("any of this word contain then it will work. ( /.*fly$ )");
})

// Sending and Receiving Query Value from API URL:
app.get("/getQuery/user", function (req, res){
    console.log("ending & Receiving QUERY value from URL", req.query);
    res.send("Sending & Receiving QUERY value from URL");
});

app.get('/getParams/userData/:userId/:userphno/:userNative', (req, res)=>{
    console.log("Receiving Params value from URL", req.params);
    res.send("Sending & Receiving Params value from URL");
});

app.listen(7777, ()=>{
    console.log('Server is running on port 7777...')
});