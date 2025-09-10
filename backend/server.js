require('dotenv').config()
const express = require('express');
const app = express();



app.use(express.json())


const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./db/connect')



app.use(notFound);
app.use(errorHandler);




const PORT = process.env.PORT || 5000
const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, console.log(`Server listening on port ${PORT}`))
    }catch(error){
        console.log(error);
    }
}
start();