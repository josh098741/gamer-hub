const mongoose = require('mongoose');

const TournamentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["solo", "team"],
        required: true,
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        refPath: "participantsModel"
    }],
    participantsModel: { // Added to support refPath
        type: String,
        enum: ["User", "Team"],
        default: function() {
            return this.type === "solo" ? "User" : "Team";
        }
    }
}, { timestamps: true });

module.exports = mongoose.model("Tournament", TournamentSchema);