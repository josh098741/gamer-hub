const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
    tournament: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tournament",
        required: true
    },
    type: {
        type: String,
        enum: ["solo", "team"], // Fixed: changed from "User","Team" to match tournament types
        required: true,
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        refPath: "participantsModel"
    }],
    participantsModel: {
        type: String,
        enum: ["User", "Team"],
        required: true
    },
    scores: {
        type: Map,
        of: Number
    },
    status: {
        type: String,
        enum: ["pending", "ongoing", "completed"],
        default: "pending"
    },
    scheduledAt: {
        type: Date
    }
}, { timestamps: true });

module.exports = mongoose.model("Match", MatchSchema);