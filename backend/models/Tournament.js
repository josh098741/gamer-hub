const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Tournament name must be provided']
    },
    game: {
        type: String,
        required: [true, 'Game name Must be provided']
    },
    type: {
        type: String,
        required: [true, 'Tournament type Must be provided']
    },
    location: {
        type: String,
        enum: ['Online','Physical'],
        required: true
    },
    startDate: {
        type: Date,
        required: [true, 'Start Date must be included']
    },
    endDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ['Pending','Ongoing','Completed'],
        default: 'Pending'
    },
    createAt: {
        type: Date.now
    }
},{timestamps: true});

module.exports = mongoose.model('Tournament',tournamentSchema)