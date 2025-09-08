const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ 
            $or: [{ email }, { username }] 
        });
        
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create user - password will be hashed in the model's pre-save hook
        const newUser = await User.create({
            username,
            email,
            password, // Don't hash here, let the model handle it
            role: role || "player",
        });

        // Remove password from response
        const userResponse = { ...newUser.toObject() };
        delete userResponse.password;

        res.status(201).json({ 
            message: "User registered successfully", 
            user: userResponse 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        
        // Use the model's matchPassword method
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: "1d" }
        );

        res.json({ 
            message: "Login successful", 
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const logout = (req, res) => {
    res.json({ message: "Logged out successfully" });
};

module.exports = {
    register,
    login,
    logout
};