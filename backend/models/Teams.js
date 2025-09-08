const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    captain: { // This field exists in schema but not used in controller
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // Made optional to match controller logic
    },
    createdBy: { // Added to match controller usage
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    logo: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model("Team", TeamSchema);