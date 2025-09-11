const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'User name required']
    },
    email: {
        type: String,
        required: [true,'email is required']
    },
    message:{
        type: String,
    },
    emailStatus: {
        type: String,
        enum: ['pending','sent','failed'],
        default: "pending"
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Registration',RegistrationSchema);