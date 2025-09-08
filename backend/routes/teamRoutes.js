const express = require("express");
const router = express.Router();
const {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
  registerTeamToTournament,
} = require("../controllers/teamController");

// Fixed middleware imports to match actual middleware names
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// @route   POST /api/teams
// @desc    Create a new team
// @access  Private (logged in)
router.post("/", auth, createTeam);

// @route   GET /api/teams
// @desc    Get all teams
// @access  Public
router.get("/", getAllTeams);

// @route   GET /api/teams/:id
// @desc    Get a team by ID
// @access  Public
router.get("/:id", getTeamById);

// @route   PUT /api/teams/:id
// @desc    Update team
// @access  Private (team creator or admin)
router.put("/:id", auth, updateTeam);

// @route   DELETE /api/teams/:id
// @desc    Delete team
// @access  Private (team creator or admin)
router.delete("/:id", auth, deleteTeam);

// @route   POST /api/teams/tournament/:tournamentId/register
// @desc    Register team in a tournament
// @access  Private
router.post(
  "/tournament/:tournamentId/register",
  auth,
  registerTeamToTournament
);

module.exports = router;