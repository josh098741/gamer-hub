const mongoose = require('mongoose');

const connectDB = async (url) => {
    try{
        await mongoose.connect(url)
        console.log('Successfully loaded the database')
    }catch(error){
        console.log('Failed in loading the database')
    }
}

module.exports = connectDB