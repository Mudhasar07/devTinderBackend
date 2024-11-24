const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    emailid: {
        type: String
    },
    password: {
        type: String
    },
    age: {
        type: String
    },
    gender: {
        type: String
    }
});

// const UserModel = mongoose.model("User", userSchema);
// module.exports = {UserModel}

module.exports = mongoose.model("Users", userSchema);