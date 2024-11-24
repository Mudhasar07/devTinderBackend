const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://mudhasar1994:kRBK7ShsDG8o7oMa@auth-token-jwt.wlfyyaf.mongodb.net/devTinder");
}

module.exports = connectDB;