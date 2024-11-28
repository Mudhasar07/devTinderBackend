const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
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
        type: String
    },
    skills: {
        type: [String]
    }
},
{timestamps: true}
);

// const UserModel = mongoose.model("User", userSchema);
// module.exports = {UserModel}

module.exports = mongoose.model("Users", userSchema);