const mongoose = require("mongoose");
const jwt = require ("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        maxLength: 50,
        minLength: 4
    },
    lastName: {
        type: String,
        required: true,
        maxLength: 50
    },
    emailId: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        minLength: 4
    },
    age: {
        type: Number,
        min: 4
    },
    gender: {
        type: String,
        validate(value){
            if(!["Male", "Female", "Others"].includes(value)){
                throw new Error("Gender is not valid");
            }
        }
    },
    skills: {
        type: [String]
    },
    description:{
        type: String,
        default: "Hello I am default Description"
    },
    photoUrl:{
        type: String
    }
},
{timestamps: true}
);

UserSchema.methods.getJWTToken = async function () {
    const user = this;
    const token = await jwt.sign({_id: user._id}, "mySecretKey", {expiresIn: "7d"});
    return token;
}

UserSchema.methods.validateUserHashPassword = async function(pass, hashPass) {
    // const user = this;
    // const userHashPassword = user.password;
    const isValidPassword = await bcrypt.compare(pass, hashPass);
    if(!isValidPassword){
        throw new Error("Invalid credentail");
    }
    return isValidPassword;
}

UserSchema.methods.destroyJWTToken = async function (req) {
    const destroyToken = jwt.destroy(res.cookie.token);
    return destroyToken;
}

// const UserModel = mongoose.model("Users", userSchema);
// module.exports = {UserModel}

module.exports = mongoose.model("Users", UserSchema);