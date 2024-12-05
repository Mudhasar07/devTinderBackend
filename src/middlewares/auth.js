const adminAuth = (req, res, next)=> {
    console.log("Auth Middleware is getting called...")
    const token = "xyz"
    const isAdminAuthorized = token === "xy111z";
    if(!isAdminAuthorized){
        res.status(404).send("Unauthorized");
    }else{
        next()
    }
} 

module.exports = {
    adminAuth
}