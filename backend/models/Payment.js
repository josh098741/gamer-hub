const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    amount: {
        type: Number,
        enum: ["mpesa","stripe","paypal"],
        required: true
    },
    status: {
        type: String,
        enum: ["pending","success","failed"],
    },
    transactionId: {
        type: String,
        unique: true,
    }
},{timestamps: true});


module.exports = mongoose.model("Payment",paymentSchema);