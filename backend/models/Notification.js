const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    recipient: { // Fixed: changed from 'user' to match controller usage
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
        enum: ["email", "sms", "whatsapp", "system"], // Added "system" type
        default: "system",
    },
    read: {
        type: Boolean, 
        default: false
    },
}, { timestamps: true });

module.exports = mongoose.model("Notification", NotificationSchema);