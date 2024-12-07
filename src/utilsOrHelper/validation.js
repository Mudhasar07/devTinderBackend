const validator = require("validator");

const validateSignUpData = (req) => {
    try{

    const {firstName, lastName, emailId, password } = req.body;

    if(!firstName || (firstName.length < 4 && firstName.lenth > 50)){
        throw new Error ("First Name should be 4 - 50 Character only...")
    }

    if(!emailId || !password){
        throw new Error ('Email or Password is missing..')
    }

    const isValidEmail = validator.isEmail(emailId);
    if(!isValidEmail){
        throw new Error("Invalid Email ID Format")
    }

    const isStrongPassword = validator.isStrongPassword(req.body.password)
    if(!isStrongPassword){
        throw new Error("Please Enter some Strong Password");
    }

    const isPhotoUrl = validator.isURL(req.body.photoUrl);
    if(!isPhotoUrl){
        throw new Error("Please valid photo URL")
    }
    }catch(err){
        throw new Error(err)
    }
}

module.exports = { validateSignUpData}