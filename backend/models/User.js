const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["player", "admin"], 
        default: "player",
    },
    phone: {
        type: String
    },
    avatar: {
        type: String
    },
}, { timestamps: true });

// Password encryption - only hash if password is modified and not already hashed
UserSchema.pre("save", async function(next) {
    // Skip if password is not modified
    if (!this.isModified("password")) return next();
    
    // Skip if password is already hashed (contains bcrypt signature)
    if (this.password.startsWith('$2a$') || this.password.startsWith('$2b$')) {
        return next();
    }
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare passwords
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);