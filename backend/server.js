require("dotenv").config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const authRoutes = require('./routes/auth');
const tournamentRoutes = require('./routes/tournaments');
const leaderboardRoutes = require('./routes/leaderboard');
const userRoutes = require('./routes/users');

const app = express();

//middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

//Error handling middleware
app.use((error,req,res,next) => {
    console.error(error);
    res.status(500).json({error: 'Internal server Error'});
});

//404 Handler
app.use('*',(req,res) => {
    res.status(404).json({error: 'Route not found'});
});

const port = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;