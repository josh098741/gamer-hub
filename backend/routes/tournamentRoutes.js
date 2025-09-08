const express = require('express');
const router = express.Router();

const {
    createTournament,
    getTournaments,
    getTournamentsById,
    updateTournament,
    deleteTournament,
    registerParticipant,
    getParticipants
} = require("../controllers/tournamentController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const validateTournament = require("../middleware/validation/validateTournament")

//CREATE tournament (admins only)
router.post("/api/tournaments",authMiddleware,roleMiddleware(["admin"]),validateTournament,createTournament);

//GET tournaments (all)
router.get("/api/tournaments",getTournaments);

//GET one tournament
router.get("/api/tournaments/:id",getTournamentsById);

//UPDATE tournament (Admin only)
router.put("/api/tournaments/:id",authMiddleware,roleMiddleware(["admin"]),updateTournament)

//DELETE tournament (Admin only)
router.delete("/api/tournaments/:id",authMiddleware,roleMiddleware(["admin"]),deleteTournament);

//REGISTER  participant (team or individual)
router.post("/api/tournaments/:id/register",authMiddleware,registerParticipant);

//GET all participants
router.get("/api/tournaments/:id/participants",getParticipants)

module.exports = router;