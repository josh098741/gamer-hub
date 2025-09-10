const Tournament = require('../models/tournament');

const createTournament = async (req,res) => {
    try{
        const tournament = await Tournament.create(req.body);
        res.status(201).json(tournament)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

const getTournaments = async (req,res) => {
    try{
        const tournament = await Tournament.find()
        res.status(200).json(tournament)
    }catch(error){
        res.send(401).json({error: error.message})
    }
}

const getTournament = async (req,res) => {
    try{
        const tournament = await Tournament.findById(req.params.id);
        if(!tournament){
            res.status(404).json({error: 'Tournament not found'})
        }
        res.status(200).json(tournament);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

const updateTournament = async (req,res) => {
    try{
        const tournament = await Tournament.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
        if(!tournament){
            res.status(404).json({error: 'Tournament not found'});
        }
        res.status(200).json(tournament);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

const deleteTournament = async (req,res) => {
    try{
        const tournament = Tournament.findByIdAndDelete(req.params.id);
        if(!tournament){
            req.status(404).jsom({error: error.message})
        }
        res.status(200).json({message: "Deleted the tournament successfully"})
    }catch(error){
         res.status(404).json({error: error.message})
    }
}

module.exports = {
    createTournament,
    getTournaments,
    getTournament,
    updateTournament,
    deleteTournament
}