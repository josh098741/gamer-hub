const mongoose = require('mongoose');

const connectDB = async (url) => {
    try{
        await mongoose.connect(url);
        console.log('Connected to MongoDB Atlas');
    }catch(error){
        console.error('Mongo db connection Error',error);
    }
}

module.exports = connectDB;