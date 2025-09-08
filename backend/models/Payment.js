const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    method: { // Fixed: moved method from amount field
        type: String,
        enum: ["mpesa", "stripe", "paypal"],
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "success", "failed"],
        default: "pending"
    },
    transactionId: {
        type: String,
        unique: true,
        sparse: true // Allows multiple null values
    }
}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);