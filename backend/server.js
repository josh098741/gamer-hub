require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser')


app.use(express.json())
app.use(bodyParser.json())

const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./db/connect')
const tournamentRoutes = require('./routes/tournamentRoutes')
const registrationRoutes = require('./routes/registration')

app.use('/api/tournaments',tournamentRoutes);
app.use('/api/register',registrationRoutes)

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