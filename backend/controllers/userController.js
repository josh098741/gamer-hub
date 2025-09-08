const User = require("../models/User");

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-password'); // Exclude passwords
        res.json(users);
    } catch (err) {
        next(err);
    }
};

const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        next(err);
    }
};

const updateUser = async (req, res, next) => {
    try {
        // Prevent password updates through this route
        const { password, ...updateData } = req.body;
        
        const updated = await User.findByIdAndUpdate(
            req.params.id, 
            updateData, 
            { new: true }
        ).select('-password');
        
        if (!updated) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.json(updated);
    } catch (err) {
        next(err);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const deleted = await User.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted" });
    } catch (err) {
        next(err);
    }
};

module.exports = { // Fixed typo from 'models.export'
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
};