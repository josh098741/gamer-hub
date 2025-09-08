const Tournament = require("../models/Tournament");
const User = require("../models/User");
const Team = require("../models/Team"); // Fixed typo from "Teams"

const createTournament = async (req, res) => {
    try {
        const { name, type, startDate, endDate } = req.body;
        const tournament = await Tournament.create({
            name,
            type,
            startDate,
            endDate,
            createdBy: req.user.id,
        });
        res.status(201).json(tournament);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTournaments = async (req, res) => {
    try {
        const tournaments = await Tournament.find()
            .populate('createdBy', 'username email')
            .populate('participants');
        res.json(tournaments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTournamentsById = async (req, res) => {
    try {
        const tournament = await Tournament.findById(req.params.id)
            .populate('createdBy', 'username email')
            .populate('participants');
        if (!tournament) {
            return res.status(404).json({ message: "Tournament not found" });
        }
        res.json(tournament);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateTournament = async (req, res) => {
    try {
        const tournament = await Tournament.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        if (!tournament) {
            return res.status(404).json({ message: "Tournament not found" });
        }
        res.json(tournament);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteTournament = async (req, res) => {
    try {
        const tournament = await Tournament.findByIdAndDelete(req.params.id);
        if (!tournament) {
            return res.status(404).json({ message: "Tournament not found" });
        }
        res.json({ message: "Tournament deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const registerParticipant = async (req, res) => {
    try {
        const tournament = await Tournament.findById(req.params.id);
        if (!tournament) {
            return res.status(404).json({ message: "Tournament not found" });
        }

        if (tournament.type === "solo") {
            if (tournament.participants.includes(req.user.id)) {
                return res.status(400).json({ message: "Already registered" });
            }
            tournament.participants.push(req.user.id);
        } else {
            const { teamId } = req.body;
            if (!teamId) {
                return res.status(400).json({ message: "Team ID required" });
            }

            // Verify team exists
            const team = await Team.findById(teamId);
            if (!team) {
                return res.status(400).json({ message: "Team not found" });
            }

            if (tournament.participants.includes(teamId)) {
                return res.status(400).json({ message: "Team already registered" });
            }
            tournament.participants.push(teamId);
        }

        await tournament.save();
        res.json({ 
            message: "Registration successful", 
            participants: tournament.participants // Fixed typo
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getParticipants = async (req, res) => { // Fixed function name
    try {
        const tournament = await Tournament.findById(req.params.id)
            .populate('participants');
        if (!tournament) {
            return res.status(404).json({ message: "Tournament not found" });
        }
        res.json(tournament.participants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createTournament,
    getTournaments,
    getTournamentsById,
    updateTournament,
    deleteTournament,
    registerParticipant,
    getParticipants // Fixed function name
};