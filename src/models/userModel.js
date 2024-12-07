const mongoose = require('mongoose');

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

// const UserModel = mongoose.model("Users", userSchema);
// module.exports = {UserModel}

module.exports = mongoose.model("Users", UserSchema);