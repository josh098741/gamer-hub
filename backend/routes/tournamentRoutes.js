const express = require('express');
const router = express.Router();

const {
    createTournament,
    getTournaments,
    getTournamentsById,
    updateTournament,
    deleteTournament,
    registerParticipant,
    getParticipants // Fixed function name
} = require("../controllers/tournamentController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const validateTournament = require("../middleware/validation/validateTournament");

// CREATE tournament (admins only)
router.post("/", authMiddleware, roleMiddleware(["admin"]), validateTournament, createTournament);

// GET tournaments (all)
router.get("/", getTournaments);

// GET one tournament
router.get("/:id", getTournamentsById);

// UPDATE tournament (Admin only)
router.put("/:id", authMiddleware, roleMiddleware(["admin"]), updateTournament);

// DELETE tournament (Admin only)
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), deleteTournament);

// REGISTER participant (team or individual)
router.post("/:id/register", authMiddleware, registerParticipant);

// GET all participants
router.get("/:id/participants", getParticipants);

module.exports = router;