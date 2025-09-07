const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req,res) => {
    try{
        const {username, email, password, role} = req.body

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            role: role || "player",
        });
        res.status(201).json({message: "User registered successfully",user: newUser})
    }catch(error){
        res.status(500).json({message: error.message})
    }
};

exports.login = async (req,res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "Invalid credentials"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid Credentials"});
        }

        const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        res.json({message: "Login succesfull", tokken})
    }catch(error){
        res.status(500).json({message: error.message});
    }
};


exports.logout = (req,res) => {
    res.json({message: "Logged out successfully"});
}