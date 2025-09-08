const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["email","sms","whatsapp"],
        default: "email",
    },
    read: {
        type: Boolean, 
        default: false
    },
},{timestamps: true});

module.exports = mongoose.model("Notification",NotificationSchema)