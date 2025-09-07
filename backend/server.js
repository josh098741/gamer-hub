require('dotenv').config();
const express = require('express');
const  connectDB = require('./db/connect');




const app = express();

//Middleware
app.use(express.json())
app.use(express.static('../public'))


/*
    <==Auth Routes==>
        (POST) /api/auth/register -> Register a user (player or admin)
        (POST) /api/auth/login -> Login get JWT
        (POST) /api/auth/logout -> Logout (optional) JWT blacklist or token expiry
    
    <==User Routes==>
        GET /api/users -> Get all users(admin only)
        GET /api/users/:id -> Get a single user profile
        PUT /api/users/:id -> Update profile info (eg phone number avatar)
        DELETE /api/users/:id -> Delete a user (admin only)

    <==Team Routes==>
        POST /api/teams -> Create a team (captain only)
        GET /api/teams -> Get all teams
        GET /api/teams/:id -> Get team details (captain, members, stats)
        PUT /api/teams/:id -> Update a team (add/remove members)
        DELETE /api/teams/:id -> Delete a team (admin or captain)
        
    <==Tournament Routes===>
        POST /api/tournaments -> Create a new tournament(admin)
        GET /api/tournaments -> Get all tournaments
        GET /api/tournaments/:id -> Get details of a specific tournament
        PUT /api/tournaments/:id -> Update tournament details (admin)
        DELETE /api/tournaments/:id -> Delete a tournament (admin)

    <==Team/Player==>
        POST  /api/tournaments/:id/register/ -> Register a team or player for a tournament
        GET   /api/tournaments/:id/participants -> get all registered players/teams

    <==Tournament Registration==>
        POST /api/tournaments/:id/register/player/:playerId -> Register a player in a solo tournament
        POST /api/tournaments/:id/register/team/:teamID -> Register a team in a team tournament
        GET /api/tournaments/:id/participants/ -> Get all perticipants (teams or players)

    <==Match Routes==>
        POST /api/matches -> Create a match (admin)
        GET /api/matches -> List all matches
        GET /api/matches/:id -> Get Match details(participants, scores)
        PUT /api/matches/:id -> Update scores or status.
        DELETE /api/matches/:id -> Remove a match (admin)

    <==Results &LeaderBoards==>
        GET /api/tournament/:id/result -> Get results/standing for a tournament
        GET /api/tournaments/:id/leaderboard -> GET leaderboard/rankings

    <==Notifications==>
        POST /api/notifications -> Send a notification(WhatsApp/SMS/Email)
        GET /api/notifications/:userId -> Get user notifications

    <==Payments==>
        POST /api/payments/initiate -> Start payment(e.g Paybill, mpesa)
        POST /api/payments/callback -> Handle payment confirmation webhook
        GET /api/payments/:userId -> Get user payment history
*/




const PORT = process.env.PORT || 5000;
const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    }catch(error){
        console.error(error);
    }
}

start();