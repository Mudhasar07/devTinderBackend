const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    requestStatus: {
        type: String,
        require: true,
        enum:{
            values: ["Interested", "Ignored", "Accepted", "Rejected"],
            message: '{VALUE} is not a Valid Type'
        }
    }
},
{timestamps: true});

// const RequestModel = mongoose.model("Request", RequestSchema);
// module.exports = {RequestModel};

module.exports = mongoose.model("Request", RequestSchema);

