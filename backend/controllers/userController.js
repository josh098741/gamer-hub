const User = require("../models/User");

const getUsers = async (req,res,next) => {
    try{
        const users = await User.find();
        res.json(users);
    }catch(err){
        next(err);
    }
}

const getUserById = async (req,res,next) => {
    try{
        const user = await User.findById(req.params.id)
        if(!user){
            return res.status(404).json({message: "User not found"})
        }
        res.json(user);
    }catch(err){
        next(err);
    }
}

const updateUser = async (req,res,next) => {
    try{
        const updated = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(updated)
    }catch(err){
        next(err);
    }
}

const deleteUser = async (req,res,next) => {
    try{
        const updated = await User.findByIdAndDelete(req.params.id);
        res.json({message: "User deleted"});
    }catch(err){
        next(err);
    }
}

models.export = {
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
}