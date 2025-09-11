require('dotenv').config();

const connectDB = require('./db/connect');
const Product = require('./models/tournament');

const jsonProduct = require('./tournament');

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI);
        await Product.deleteMany();
        await Product.create(jsonProduct);
        process.exit(0);
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}

start();